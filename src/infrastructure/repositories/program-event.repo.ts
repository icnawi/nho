import { type ProgramEvent } from '@core/entities/program-event';
import { type ProgramEventPayload } from '@core/entities/program-event.payload';
import { type ProgramEventRepository } from '@core/repositories/program-event.repo';
import { programEventDao } from '@infrastructure/database/program-event/program-event.dao';
import IdlJson from '../../assets/mango_v4.json';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  VersionedTransactionResponse,
} from '@solana/web3.js';
import { EventParser, Program } from '@project-serum/anchor';
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

    const transactionOrNulls: (VersionedTransactionResponse | null)[] =
      await connection.getTransactions(
        R.map(tx => tx.signature, signatures),
        { maxSupportedTransactionVersion: 0 },
      );

    const problemTransactions = R.compose<
      [(VersionedTransactionResponse | null)[]],
      (string | null)[],
      string[]
    >(
      R.filter(R.complement(R.isNil)),
      R.addIndex(R.map)((tx, idx) => (tx ? null : signatures[idx].signature)),
    )(transactionOrNulls);

    if (problemTransactions.length) {
      throw Error(
        `Details for the following transactions were not found ${problemTransactions.join(', ')}`,
      );
    }

    const transactions: VersionedTransactionResponse[] = R.filter(R.complement(R.isNil))(
      transactionOrNulls,
    );

    return R.compose<
      [VersionedTransactionResponse[]],
      ProgramEventPayload[],
      ProgramEventPayload[]
    >(
      R.filter(R.complement(R.isNil)),
      R.map((tx: VersionedTransactionResponse): ProgramEventPayload => {
        const logs = tx.meta?.logMessages;
        return {
          blockTime: tx.blockTime!,
          signature: tx.transaction.signatures[0],
          events: [...eventParser.parseLogs(logs!)],
        };
      }),
    )(transactions);
  }
}
