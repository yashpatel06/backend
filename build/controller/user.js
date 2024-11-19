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
exports.getPaoController = exports.postPaoController = void 0;
const user_1 = __importDefault(require("../models/user"));
const postPaoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("DATAAAAAAAAAAA", req.body);
        const { phoneNumber, firstName, lastName, dob } = req.body;
        yield user_1.default.create({
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
        });
        return res.status(200).json({ message: "API send sucessfully" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.postPaoController = postPaoController;
const getPaoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("DATAAAAAAAAAAA", req.body);
        // console.log(req.body.webDecoded, "webDecoded");
        const id = req.body.webDecoded.id;
        console.log(id, "IDDDDDDDDDD");
        const userById = yield user_1.default.findById(id);
        return res
            .status(200)
            .json({ message: "API send sucessfully", data: userById });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPaoController = getPaoController;
