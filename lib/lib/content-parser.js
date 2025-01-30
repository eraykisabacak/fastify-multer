"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMultipart = isMultipart;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const kMultipart = Symbol('multipart');
function setMultipart(req, _payload, done) {
    ;
    req[kMultipart] = true;
    done(null);
}
function isMultipart() {
    return this.raw[kMultipart] || false;
}
function fastifyMulter(fastify, _options, next) {
    fastify.addContentTypeParser(['multipart', 'multipart/form-data'], setMultipart);
    fastify.decorateRequest('isMultipart', isMultipart);
    next();
}
const multer = (0, fastify_plugin_1.default)(fastifyMulter, {
    fastify: '>= 3.0.0',
    name: 'fastify-multer',
});
exports.default = multer;
//# sourceMappingURL=content-parser.js.map