import { type FastifyRequest, type FastifyReply } from "fastify";
import { MangoEventRepository } from "@core/repositories/mango-event.repo";
import { mangoEventService } from "@core/services/mango-event.svc";
import { MangoEventPayload } from "@core/entities/mango-event.payload";
import { MangoEventParamsType } from "@infrastructure/http/schemas/mango-event.schemas";

export const saveEvent = (mangoEventRepository: MangoEventRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    const event = await mangoEventService(mangoEventRepository).saveEvent(
      request.body as MangoEventPayload
    );
    void reply.status(201).send(event);
  };

export const getEvents = (mangoEventRepository: MangoEventRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    const event = await mangoEventService(mangoEventRepository).getEvents();
    if (event) {
      return reply.status(200).send(event);
    }
    return reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "Not Found",
    });
  };

export const fetchEventsFromChain = (
  mangoEventRepository: MangoEventRepository
) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    const event = await mangoEventService(
      mangoEventRepository
    ).fetchEventsFromChain();
    console.log("BAYAN");
    if (event) {
      return reply.status(200).send(event);
    }
    return reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "Not Found",
    });
  };

export const getEvent = (mangoEventRepository: MangoEventRepository) =>
  async function (
    request: FastifyRequest<{ Params: MangoEventParamsType }>,
    reply: FastifyReply
  ) {
    const id = request.params.id;
    const event = await mangoEventService(mangoEventRepository).getEvent(id);
    if (event) {
      return reply.status(200).send(event);
    }
    return reply.status(404).send({
      statusCode: 404,
      error: "Not Found",
      message: "Not Found",
    });
  };
