"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const users_typeDef_js_1 = __importDefault(require("./users.typeDef.js"));
const transaction_typeDef_js_1 = __importDefault(require("./transaction.typeDef.js"));
const mergedTypeDefs = (0, merge_1.mergeTypeDefs)([users_typeDef_js_1.default, transaction_typeDef_js_1.default]);
exports.default = mergedTypeDefs;
