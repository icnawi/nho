import { type FastifySchema } from "fastify";
import { Type, type Static } from "@sinclair/typebox";
import { notFoundSchema } from "@infrastructure/http/schemas/error.schemas";

export const MangoEvent = Type.Object({
  id: Type.Optional(Type.String()),
  blockTime: Type.Number(),
  events: Type.Array(
    Type.Object({
      mangoGroup: Type.String(),
      marketIndex: Type.Number(),
      longFunding: Type.BigInt(),
      shortFunding: Type.BigInt(),
      price: Type.BigInt(),
      oracleSlot: Type.BigInt(),
      stablePrice: Type.BigInt(),
      feesAccrued: Type.BigInt(),
      feesSettled: Type.BigInt(),
      openInterest: Type.BigInt(),
      instantaneousFundingRate: Type.BigInt(),
    })
  ),
  signature: Type.String(),
});

export type MangoEventType = Static<typeof MangoEvent>;

const MangoEventParams = Type.Object({
  id: Type.String({ description: "Mango Event Id" }),
});

export type MangoEventParamsType = Static<typeof MangoEventParams>;

export const MangoEventPayload = Type.Intersect([MangoEvent, Type.Object({})], {
  examples: [
    {
      id: "61cd0e4be59031edffa39f5c",
      blockTime: 1682221366,
      events: [],
      signature:
        "5xRdo7FrPpazqV4KqU7YQ7jvgVh69TGDjiupjrj4sBqiZ3UuPM3ZkAFBF4KxgdfJxhLjKRaJXdquW3e7hny1kDwd",
    },
  ],
});

export const MangoEventResponse = Type.Intersect(
  [MangoEvent, Type.Object({})],
  {
    examples: [
      {
        id: "61cd0e4be59031edffa39f5c",
        blockTime: 1682221366,
        events: [],
        signature:
          "5xRdo7FrPpazqV4KqU7YQ7jvgVh69TGDjiupjrj4sBqiZ3UuPM3ZkAFBF4KxgdfJxhLjKRaJXdquW3e7hny1kDwd",
      },
    ],
  }
);

export const saveEventSchema: FastifySchema = {
  description: "Create a new event",
  tags: ["mango event"],
  summary: "Saves new Mango Event",
  body: MangoEventPayload,
  response: {
    201: { ...MangoEventResponse, description: "Success" },
  },
};

export const getEventSchema: FastifySchema = {
  description: "Gets a single event",
  tags: ["events"],
  summary: "Gets event by Id",
  response: {
    200: { ...MangoEventResponse, description: "Success" },
    404: { ...notFoundSchema, description: "Not found" },
  },
};

export const getEventsSchema: FastifySchema = {
  description: "Gets a list of events",
  tags: ["events"],
  summary: "Gets all events",
  response: {
    200: { ...MangoEventResponse, description: "Success" },
    404: { ...notFoundSchema, description: "Not found" },
  },
};
