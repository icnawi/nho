import { type ProgramEvent } from '@core/entities/program-event';
import { type ProgramEventPayload } from '@core/entities/program-event.payload';
import { type ProgramEventRepository } from '@core/repositories/program-event.repo';
import { programEventDao } from '@infrastructure/database/program-event/program-event.dao';
import IdlJson from '../../assets/mango_v4.json';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, EventParser } from '@project-serum/anchor';
import * as R from 'ramda';

export class ProgramEventRepo implements ProgramEventRepository {
  async saveEvent(eventPayload: ProgramEventPayload): Promise<ProgramEvent> {
    return await programEventDao.create(eventPayload);
  }

  async getEvent(id: string): Promise<ProgramEvent | undefined> {
    const event = await programEventDao.findById(id);
    if (event) {
      return event;
    }
  }

  async getEvents(): Promise<ProgramEvent[]> {
    return programEventDao.find({});
  }

  async fetchEventsFromChain(): Promise<ProgramEventPayload[]> {
    const cluster = clusterApiUrl('mainnet-beta');
    const connection = new Connection(cluster);
    // ENV Const
    const currentProgramId = new PublicKey('4MangoMjqJ2firMokCjjGgoK8d4MXcrgL7XJaL3w6fVg');
    const { programId, coder } = new Program(JSON.parse(JSON.stringify(IdlJson)), currentProgramId);

    const eventParser = new EventParser(programId, coder);

    const signatures = await connection.getSignaturesForAddress(programId, {
      limit: 40,
    });

    const transactionOrNulls = await connection.getTransactions(
      R.map(x => x.signature, signatures),
      { maxSupportedTransactionVersion: 0 },
    );

    const problemTransactions = R.compose(
      R.filter(R.complement(R.isNil)),
      // @ts-ignore
      R.map((tx, index) => (tx ? null : signatures[index].signature)),
    )(transactionOrNulls);

    if (problemTransactions.length) {
      throw Error(
        'Details for the following transactions were not found: ' + problemTransactions.join(', '),
      );
    }

    const transactions = R.filter(R.complement(R.isNil))(transactionOrNulls);

    const events = transactions
      .map(tx => {
        const logs = tx.meta?.logMessages;
        return logs
          ? {
              signature: tx.transaction.signatures[0],
              blockTime: tx.blockTime,
              events: [...eventParser.parseLogs(logs)],
            }
          : null;
      })
      .filter(tx => !!tx);
    // @ts-ignore
    return events;
  }
}
