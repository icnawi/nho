import { type ProgramEvent } from "@core/entities/program-event";
import { type ProgramEventPayload } from "@core/entities/program-event.payload";
import { type ProgramEventRepository } from "@core/repositories/program-event.repo";

interface ProgramEventService {
  saveEvent: (eventPayload: ProgramEventPayload) => Promise<ProgramEvent>;
  getEvent: (id: string) => Promise<ProgramEvent | undefined>;
  getEvents: () => Promise<ProgramEvent[]>;
  fetchEventsFromChain: () => Promise<ProgramEventPayload[]>;
}

export const programEventService = (
  eventRepo: ProgramEventRepository
): ProgramEventService => ({
  getEvent: async (id: string): Promise<ProgramEvent | undefined> => {
    return eventRepo.getEvent(id);
  },
  getEvents: async (): Promise<ProgramEvent[]> => {
    return eventRepo.getEvents();
  },
  saveEvent: async (eventPayload: ProgramEventPayload): Promise<ProgramEvent> => {
    return eventRepo.saveEvent(eventPayload);
  },
  fetchEventsFromChain: async (): Promise<ProgramEventPayload[]> => {
    return eventRepo.fetchEventsFromChain();
  },
});
