import { FastifyRequest } from 'fastify';
import { Strategy } from './lib/file-appender';
export interface RequestGeneric {
    Body: object;
}
export type FilesObject = {
    [fieldname: string]: Partial<File>[];
};
export interface Field {
    name: string;
    maxCount?: number;
}
export interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size?: number;
    destination?: string;
    filename?: string;
    path?: string;
    buffer?: Buffer;
    stream?: NodeJS.ReadableStream;
}
export type FileFilterCallback = (error: Error | null, acceptFile?: boolean) => void;
export type FileFilter = (req: FastifyRequest<RequestGeneric>, file: File, callback: FileFilterCallback) => void;
export interface Options {
    dest?: string;
    storage?: StorageEngine;
    limits?: {
        fieldNameSize?: number;
        fieldSize?: number;
        fields?: number;
        fileSize?: number;
        files?: number;
        parts?: number;
        headerPairs?: number;
    };
    preservePath?: boolean;
    fileFilter?: FileFilter;
}
export interface StorageEngine {
    _handleFile(req: FastifyRequest<RequestGeneric>, file: File, callback: (error?: Error | null, info?: Partial<File>) => void): void;
    _removeFile(req: FastifyRequest<RequestGeneric>, file: File, callback: (error?: Error | null) => void): void;
}
export type GetFileName = (req: FastifyRequest<RequestGeneric>, file: File, callback: (error: Error | null, filename?: string) => void) => void;
export type GetDestination = (req: FastifyRequest<RequestGeneric>, file: File, callback: (error: Error | null, destination: string) => void) => void;
export interface DiskStorageOptions {
    destination?: string | GetDestination;
    filename?: GetFileName;
}
export type Setup = () => {
    storage: StorageEngine;
    limits: Options['limits'];
    preservePath: Options['preservePath'];
    fileFilter: FileFilter;
    fileStrategy: Strategy;
};
