"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    phoneNumber: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    dob: { type: Date, required: false },
    otp: { type: String, required: false },
}, {
    timestamps: true,
});
const userModel = mongoose_1.default.model("user", userSchema);
exports.default = userModel;
