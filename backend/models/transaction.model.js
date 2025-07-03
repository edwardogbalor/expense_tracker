"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    paymentType: {
        type: String,
        enum: ["cash", "card", "bank", "e-transfer"],
        required: true,
    },
    category: {
        type: String,
        enum: ["saving", "expense", "investment"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        default: "Unknown",
    },
    date: {
        type: Date,
        required: true,
    },
});
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
