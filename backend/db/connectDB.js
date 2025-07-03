"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri)
            throw new Error("MONGO_URI is not defined");
        const conn = await mongoose_1.default.connect(uri, {
            ssl: true,
            tls: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        }
        else {
            console.error("Unknown error", err);
        }
        process.exit(1);
    }
};
exports.connectDB = connectDB;
