import { type FastifyRequest, type FastifyReply } from 'fastify';
import { ProgramEventRepository } from '@core/repositories/program-event.repo';
import { programEventService } from '@core/services/program-event.svc';
import { ProgramEventPayload } from '@core/entities/program-event.payload';
import { ProgramEventParamsType } from '@infrastructure/http/schemas/program-event.schemas';

export const saveEvent = (programEventRepository: ProgramEventRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    const event = await programEventService(programEventRepository).saveEvent(
      request.body as ProgramEventPayload,
    );
    void reply.status(201).send(event);
  };

export const getEvents = (programEventRepository: ProgramEventRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    const event = await programEventService(programEventRepository).getEvents();
    if (event) {
      return reply.status(200).send(event);
    }
    return reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    });
  };

export const fetchEventsFromChain = (programEventRepository: ProgramEventRepository) =>
  async function (request: FastifyRequest, reply: FastifyReply) {
    const event = await programEventService(programEventRepository).fetchEventsFromChain();
    if (event) {
      return reply.status(200).send(event);
    }
    return reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    });
  };

export const getEvent = (programEventRepository: ProgramEventRepository) =>
  async function (
    request: FastifyRequest<{ Params: ProgramEventParamsType }>,
    reply: FastifyReply,
  ) {
    const id = request.params.id;
    const event = await programEventService(programEventRepository).getEvent(id);
    if (event) {
      return reply.status(200).send(event);
    }
    return reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    });
  };
