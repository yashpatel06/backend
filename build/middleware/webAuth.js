"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenVerify = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized API request, token not provided.",
            });
        }
        const deCoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_USER);
        req.body.webDecoded = deCoded;
        next();
    }
    catch (error) {
        console.log("Token error", error);
        return res.status(500).json({
            status: false,
            message: "Unauthorized API request.",
        });
    }
};
exports.default = TokenVerify;
