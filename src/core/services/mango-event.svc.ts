import { type MangoEvent } from "@core/entities/mango-event";
import { type MangoEventPayload } from "@core/entities/mango-event.payload";
import { type MangoEventRepository } from "@core/repositories/mango-event.repo";

interface MangoEventService {
  saveEvent: (eventPayload: MangoEventPayload) => Promise<MangoEvent>;
  getEvent: (id: string) => Promise<MangoEvent | undefined>;
  getEvents: () => Promise<MangoEvent[]>;
  fetchEventsFromChain: () => Promise<MangoEventPayload[]>;
}

export const mangoEventService = (
  mangoEventRepository: MangoEventRepository
): MangoEventService => ({
  getEvent: async (id: string): Promise<MangoEvent | undefined> => {
    return mangoEventRepository.getEvent(id);
  },
  getEvents: async (): Promise<MangoEvent[]> => {
    return mangoEventRepository.getEvents();
  },
  saveEvent: async (eventPayload: MangoEventPayload): Promise<MangoEvent> => {
    return mangoEventRepository.saveEvent(eventPayload);
  },
  fetchEventsFromChain: async (): Promise<MangoEventPayload[]> => {
    return mangoEventRepository.fetchEventsFromChain();
  },
});
