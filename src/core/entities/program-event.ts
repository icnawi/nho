import BN from 'bn.js';
import { IdlEvent } from '@project-serum/anchor/dist/cjs/idl';
import { Event } from '@project-serum/anchor';

export interface ParsedEventData {
  mangoGroup: string;
  marketIndex: number;
  longFunding: BN;
  shortFunding: BN;
  price: BN;
  oracleSlot: BN;
  stablePrice: BN;
  feesAccrued: BN;
  feesSettled: BN;
  openInterest: BN;
  instantaneousFundingRate: BN;
}

export interface ParsedEvent {
  data: ParsedEventData;
  name: string;
}

export interface ProgramEvent {
  id: string;
  blockTime: number | null;
  events: Event<IdlEvent, ParsedEvent>[];
  signature: string;
}
