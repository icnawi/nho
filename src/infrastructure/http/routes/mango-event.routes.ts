import { type RouteOptions, type RouteHandlerMethod } from "fastify";
import {
  getEventSchema,
  getEventsSchema,
} from "../schemas/mango-event.schemas.js";
import {
  fetchEventsFromChain,
  getEvent,
  getEvents,
} from "../controllers/mango-event.ctrl.js";
import { MangoEventRepository } from "@core/repositories/mango-event.repo";

export const mangoEventsRoutes = (
  mangoEventsRepository: MangoEventRepository
): RouteOptions[] => [
  // {
  //   method: "POST",
  //   url: "/mango-events",
  //   schema: saveEventSchema,
  //   handler: saveEvent(mangoEventsRepository),
  // },
  {
    method: "GET",
    url: "/mango-events/:id",
    schema: getEventSchema,
    handler: getEvent(mangoEventsRepository) as RouteHandlerMethod,
  },
  {
    method: "GET",
    url: "/mango-events",
    schema: getEventsSchema,
    handler: getEvents(mangoEventsRepository) as RouteHandlerMethod,
  },
  {
    method: "GET",
    url: "/fetch-mango-events",
    handler: fetchEventsFromChain(mangoEventsRepository) as RouteHandlerMethod,
  },
];
