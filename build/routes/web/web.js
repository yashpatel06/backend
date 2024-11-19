"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controller/user");
const auth_1 = require("../../controller/auth");
const webAuth_1 = __importDefault(require("../../middleware/webAuth"));
const webRouter = (0, express_1.Router)();
webRouter.post("/getOtp", auth_1.loginWithNumberController);
webRouter.post("/verifyOTP", auth_1.verifyOTPController);
webRouter.post("/postuser", user_1.postPaoController);
webRouter.get("/getuser", webAuth_1.default, user_1.getPaoController);
exports.default = webRouter;
