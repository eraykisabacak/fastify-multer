import { PluginOptions } from 'fastify-plugin';
import { FastifyInstance, FastifyRequest } from 'fastify';
export declare function isMultipart(this: FastifyRequest): boolean;
declare function fastifyMulter(fastify: FastifyInstance, _options: PluginOptions, next: (err?: Error) => void): void;
declare const multer: typeof fastifyMulter;
export default multer;
