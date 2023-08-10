import { type ProgramEventPayload } from '@core/entities/program-event.payload';
import { type ProgramEvent } from '@core/entities/program-event';

export interface ProgramEventRepository {
  saveEvent: (eventPayload: ProgramEventPayload) => Promise<ProgramEvent>;
  getEvent: (id: string) => Promise<ProgramEvent | undefined>;
  getEvents: () => Promise<ProgramEvent[]>;
  fetchEventsFromChain: () => Promise<ProgramEventPayload[]>;
}
