"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTPController = exports.loginWithNumberController = void 0;
const user_1 = __importDefault(require("../models/user"));
const twilio_1 = __importDefault(require("twilio"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
console.log(accountSid, "accountSid");
const twilioClient = (0, twilio_1.default)(accountSid, authToken);
const loginWithNumberController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber } = req.body;
        console.log(phoneNumber, "phoneNumber");
        const user = yield user_1.default.findOne({ phoneNumber: phoneNumber });
        console.log(user, "USER");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        // Store the OTP in memory (in a real application, you would store it securely and associate it with the user)
        yield user_1.default.findOneAndUpdate({
            phoneNumber: phoneNumber,
        }, { otp: otp });
        twilioClient.messages
            .create({
            body: `Your OTP for login is: ${otp}`,
            from: process.env.NUMBER,
            to: `+91 ${phoneNumber}`,
        })
            .then(() => {
            res.json({ message: "OTP sent successfully" });
        })
            .catch((err) => {
            console.error("Error sending OTP:", err);
            res.status(500).json({ message: "Failed to send OTP" });
        });
    }
    catch (error) { }
});
exports.loginWithNumberController = loginWithNumberController;
const verifyOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, otp } = req.body;
        const user = yield user_1.default.findOne({ phoneNumber: phoneNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if ((user === null || user === void 0 ? void 0 : user.otp) !== otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }
        else {
            const userx = yield user_1.default.findOneAndUpdate({
                phoneNumber: phoneNumber,
            }, { otp: null });
            const token = jsonwebtoken_1.default.sign({ phoneNumber: phoneNumber, id: userx === null || userx === void 0 ? void 0 : userx._id }, process.env.SECRET_JWT_USER);
            res.json({
                data: user,
                token: token,
                message: "OTP verified successfully",
            });
        }
        // Clear the OTP after successful verification
    }
    catch (error) { }
});
exports.verifyOTPController = verifyOTPController;
