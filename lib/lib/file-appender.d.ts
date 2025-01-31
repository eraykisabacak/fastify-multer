import { FastifyRequest } from 'fastify';
import { File } from '../interfaces';
export type Strategy = 'NONE' | 'VALUE' | 'ARRAY' | 'OBJECT';
type Placeholder = {
    fieldname?: string;
};
declare class FileAppender {
    strategy: Strategy;
    request: FastifyRequest;
    constructor(strategy: Strategy, request: FastifyRequest);
    insertPlaceholder(file: Pick<File, 'fieldname' | 'originalname' | 'encoding' | 'mimetype'>): {
        fieldname: string;
    };
    removePlaceholder(placeholder: Placeholder): void;
    replacePlaceholder(placeholder: Placeholder, file: File): void;
}
export default FileAppender;
