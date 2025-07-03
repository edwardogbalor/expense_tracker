"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const graphql_passport_1 = require("graphql-passport");
const configurePassport = async () => {
    passport_1.default.serializeUser((user, done) => {
        console.log("Serializing user");
        done(null, user.id);
    });
    passport_1.default.deserializeUser(async (id, done) => {
        console.log("Deserializing user");
        try {
            const user = await user_model_js_1.default.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
    passport_1.default.use(new graphql_passport_1.GraphQLLocalStrategy(async (username, password, done) => {
        try {
            const user = await user_model_js_1.default.findOne({ username });
            if (!user) {
                throw new Error("Invalid username or password");
            }
            const validPassword = await bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                throw new Error("Invalid username or password");
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }));
};
exports.configurePassport = configurePassport;
