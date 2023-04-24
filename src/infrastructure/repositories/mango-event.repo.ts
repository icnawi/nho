import { type MangoEvent } from "@core/entities/mango-event";
import { type MangoEventPayload } from "@core/entities/mango-event.payload";
import { type MangoEventRepository } from "@core/repositories/mango-event.repo";
import { mangoEventDAO } from "../database/mango-event/mango-event.dao";
import { readFile } from "fs/promises";
import mangoIdlJson from "../../assets/mango_v4.json";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  ConfirmedSignatureInfo,
  VersionedTransactionResponse,
} from "@solana/web3.js";
import { Program, EventParser, Event } from "@project-serum/anchor";
import * as R from "ramda";

export class MangoEventRepo implements MangoEventRepository {
  async saveEvent(eventPayload: MangoEventPayload): Promise<MangoEvent> {
    return await mangoEventDAO.create(eventPayload);
  }

  async getEvent(id: string): Promise<MangoEvent | undefined> {
    const event = await mangoEventDAO.findById(id);
    if (event) {
      return event;
    }
  }

  async getEvents(): Promise<MangoEvent[]> {
    return mangoEventDAO.find({});
  }

  async fetchEventsFromChain(): Promise<MangoEventPayload[]> {
    const cluster = clusterApiUrl("mainnet-beta");
    const connection = new Connection(cluster);
    // ENV Const
    const mangoProgramId = new PublicKey(
      "4MangoMjqJ2firMokCjjGgoK8d4MXcrgL7XJaL3w6fVg"
    );
    const { programId, coder } = new Program(
      JSON.parse(JSON.stringify(mangoIdlJson)),
      mangoProgramId
    );

    const eventParser = new EventParser(programId, coder);

    const signatures = await connection.getSignaturesForAddress(programId, {
      limit: 40,
    });

    const transactionOrNulls = await connection.getTransactions(
      R.map((x) => x.signature, signatures),
      { maxSupportedTransactionVersion: 0 }
    );

    const problemTransactions = R.compose(
      R.filter(R.complement(R.isNil)),
      // @ts-ignore
      R.map((tx, index) => (tx ? null : signatures[index].signature))
    )(transactionOrNulls);

    if (problemTransactions.length) {
      throw Error(
        "Details for the following transactions were not found: " +
          problemTransactions.join(", ")
      );
    }

    const transactions = R.filter(R.complement(R.isNil))(transactionOrNulls);

    const events = transactions
      .map((tx) => {
        const logs = tx.meta?.logMessages;
        return logs
          ? {
              signature: tx.transaction.signatures[0],
              blockTime: tx.blockTime,
              events: [...eventParser.parseLogs(logs)],
            }
          : null;
      })
      .filter((tx) => !!tx);
    // @ts-ignore
    return events;
  }
}
