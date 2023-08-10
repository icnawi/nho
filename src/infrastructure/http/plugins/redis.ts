import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import RedisPlugin from '@fastify/redis';

const redisPlugin: FastifyPluginAsync = async (fastify, opts) => {
  fastify.register(RedisPlugin, {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  });
};

export default fp(redisPlugin);
