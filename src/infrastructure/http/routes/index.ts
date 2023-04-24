import { type RouteOptions } from "fastify";
import { MangoEventRepository } from "@core/repositories/mango-event.repo";
import { mangoEventsRoutes } from "./mango-event.routes.js";

export default (mangoEventRepository: MangoEventRepository): RouteOptions[] => [
  ...mangoEventsRoutes(mangoEventRepository),
];
