"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web_1 = __importDefault(require("./web/web"));
const mainRoute = express_1.default.Router();
mainRoute.use("/api/web", web_1.default);
exports.default = mainRoute;
