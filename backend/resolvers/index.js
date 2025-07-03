"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const user_resolver_js_1 = __importDefault(require("./user.resolver.js"));
const transaction_resolver_js_1 = __importDefault(require("./transaction.resolver.js"));
const mergedResolvers = (0, merge_1.mergeResolvers)([user_resolver_js_1.default, transaction_resolver_js_1.default]);
exports.default = mergedResolvers;
