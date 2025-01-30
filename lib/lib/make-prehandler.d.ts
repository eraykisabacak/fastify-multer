import { FastifyReply, FastifyRequest } from 'fastify';
import { Setup } from '../interfaces';
interface RequestGeneric {
    Body: object;
}
declare function makePreHandler(setup: Setup): (request: FastifyRequest<RequestGeneric>, _: FastifyReply, next: (err?: Error) => void) => void;
export default makePreHandler;
