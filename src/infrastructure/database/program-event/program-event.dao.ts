import { model } from 'mongoose';
import { type ProgramEvent } from '@core/entities/program-event';
import { programEventSchema } from '@infrastructure/database/program-event/program-event.schema';

export const programEventDao = model<ProgramEvent>('ProgramEvent', programEventSchema);
