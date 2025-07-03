"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
