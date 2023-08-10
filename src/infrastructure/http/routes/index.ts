import { type RouteOptions } from 'fastify';
import { ProgramEventRepository } from '@core/repositories/program-event.repo';
import { programEventsRoutes } from './program-event.routes';

export default (programEventRepository: ProgramEventRepository): RouteOptions[] => [
  ...programEventsRoutes(programEventRepository),
];
