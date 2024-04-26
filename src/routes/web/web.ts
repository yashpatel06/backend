import { Router } from "express";
import { getPaoController, postPaoController } from "../../controller/user";
import {
  loginWithNumberController,
  verifyOTPController,
} from "../../controller/auth";
import TokenVerify from "../../middleware/webAuth";

const webRouter = Router();

webRouter.post("/getOtp", loginWithNumberController);
webRouter.post("/verifyOTP", verifyOTPController);

webRouter.post("/postuser", postPaoController);
webRouter.get("/getuser", TokenVerify, getPaoController);

export default webRouter;
