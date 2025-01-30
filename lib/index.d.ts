import { preHandlerHookHandler } from 'fastify';
import diskStorage from './storage/disk';
import memoryStorage from './storage/memory';
import MulterError from './lib/multer-error';
import contentParser from './lib/content-parser';
import 'fastify';
import { isMultipart } from './lib/content-parser';
import { Field, File, FilesObject, Options, FileFilter, StorageEngine, RequestGeneric } from './interfaces';
type FilesInRequest = FilesObject | Partial<File>[];
declare module 'fastify' {
    interface FastifyRequest {
        isMultipart: typeof isMultipart;
        file: File;
        files: FilesInRequest;
    }
}
declare class Multer {
    storage: StorageEngine;
    limits: Options['limits'];
    preservePath: Options['preservePath'];
    fileFilter: FileFilter;
    contentParser: typeof contentParser;
    constructor(options: Options);
    private _makePreHandler;
    single(name: string): preHandlerHookHandler<any, any, any, RequestGeneric>;
    array(name: string, maxCount?: number): preHandlerHookHandler<any, any, any, RequestGeneric>;
    fields(fields: Field[]): preHandlerHookHandler<any, any, any, RequestGeneric>;
    none(): preHandlerHookHandler<any, any, any, RequestGeneric>;
    any(): preHandlerHookHandler<any, any, any, RequestGeneric>;
}
interface MulterFactory {
    (options?: Options | undefined): Multer;
    contentParser: typeof contentParser;
    diskStorage: typeof diskStorage;
    memoryStorage: typeof memoryStorage;
    MulterError: typeof MulterError;
    default: MulterFactory;
}
declare const _default: MulterFactory;
export = _default;
