import { type MangoEvent } from "@core/entities/mango-event";

export type MangoEventPayload = Omit<MangoEvent, "id">;
