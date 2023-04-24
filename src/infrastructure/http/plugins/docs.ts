import fp from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import fastifySwagger, {
  type FastifyDynamicSwaggerOptions,
} from "@fastify/swagger";
import fastifySwaggerUi, {
  type FastifySwaggerUiOptions,
} from "@fastify/swagger-ui";

const docsPlugin: FastifyPluginAsync = async (server) => {
  const openApiOptions: FastifyDynamicSwaggerOptions = {
    openapi: {
      info: {
        title: "mango-v4-events-parser",
        description:
          "REST API built to access Solana RPC endpoint and query txs",
        version: "0.1.0",
      },
      components: {
        securitySchemes: {
          Bearer: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
    },
    hideUntagged: true,
  };

  await server.register(fastifySwagger, openApiOptions);

  const openApiUiOptions: FastifySwaggerUiOptions = {
    routePrefix: "/docs",
    initOAuth: {},
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  };

  await server.register(fastifySwaggerUi, openApiUiOptions);
};

export default fp(docsPlugin);
