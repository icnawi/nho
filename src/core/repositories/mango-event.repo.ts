import { type MangoEventPayload } from "@core/entities/mango-event.payload";
import { type MangoEvent } from "@core/entities/mango-event";

export interface MangoEventRepository {
  saveEvent: (eventPayload: MangoEventPayload) => Promise<MangoEvent>;
  getEvent: (id: string) => Promise<MangoEvent | undefined>;
  getEvents: () => Promise<MangoEvent[]>;
  fetchEventsFromChain: () => Promise<MangoEventPayload[]>;
}
