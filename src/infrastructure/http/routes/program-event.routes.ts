import { type RouteOptions, type RouteHandlerMethod } from 'fastify';
import { getEventSchema, getEventsSchema } from '../schemas/program-event.schemas';
import { fetchEventsFromChain, getEvent, getEvents } from '../controllers/program-event.ctrl';
import { ProgramEventRepository } from '@core/repositories/program-event.repo';

export const programEventsRoutes = (
  programEventsRepository: ProgramEventRepository,
): RouteOptions[] => [
  {
    method: 'GET',
    url: '/events/:id',
    schema: getEventSchema,
    handler: getEvent(programEventsRepository) as RouteHandlerMethod,
  },
  {
    method: 'GET',
    url: '/events',
    schema: getEventsSchema,
    handler: getEvents(programEventsRepository) as RouteHandlerMethod,
  },
  {
    method: 'GET',
    url: '/fetch-events',
    handler: fetchEventsFromChain(programEventsRepository) as RouteHandlerMethod,
  },
];
