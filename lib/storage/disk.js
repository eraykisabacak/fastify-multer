"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const os_1 = __importDefault(require("os"));
const path_1 = require("path");
const crypto_1 = __importDefault(require("crypto"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const getFilename = (_req, _file, cb) => {
    crypto_1.default.randomBytes(16, function (err, raw) {
        cb(err, err ? undefined : raw.toString('hex'));
    });
};
const getDestination = (_req, _file, cb) => {
    cb(null, os_1.default.tmpdir());
};
class DiskStorage {
    constructor(opts) {
        this.getFilename = opts.filename || getFilename;
        if (typeof opts.destination === 'string') {
            mkdirp_1.default.sync(opts.destination);
            this.getDestination = function (_$0, _$1, cb) {
                cb(null, opts.destination);
            };
        }
        else {
            this.getDestination = opts.destination || getDestination;
        }
    }
    _handleFile(req, file, cb) {
        this.getDestination(req, file, (err, destination) => {
            if (err) {
                return cb(err);
            }
            this.getFilename(req, file, (error, filename) => {
                if (error) {
                    return cb(error);
                }
                const finalPath = (0, path_1.join)(destination, filename);
                const outStream = (0, fs_1.createWriteStream)(finalPath);
                file.stream.pipe(outStream);
                outStream.on('error', cb);
                outStream.on('finish', () => {
                    cb(null, {
                        destination,
                        filename,
                        path: finalPath,
                        size: outStream.bytesWritten,
                    });
                });
            });
        });
    }
    _removeFile(_req, file, cb) {
        const path = file.path;
        delete file.destination;
        delete file.filename;
        delete file.path;
        (0, fs_1.unlink)(path, cb);
    }
}
exports.default = (opts) => new DiskStorage(opts);
//# sourceMappingURL=disk.js.map