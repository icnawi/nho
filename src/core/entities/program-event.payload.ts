import { type ProgramEvent } from '@core/entities/program-event';

export type ProgramEventPayload = Omit<ProgramEvent, 'id'>;
