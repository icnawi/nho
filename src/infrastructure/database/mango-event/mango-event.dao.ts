import { model } from "mongoose";
import { type MangoEvent } from "@core/entities/mango-event";
import { mangoEventSchema } from "@infrastructure/database/mango-event/mango-event.schema";

export const mangoEventDAO = model<MangoEvent>("MangoEvent", mangoEventSchema);
