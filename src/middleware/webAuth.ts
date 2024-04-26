import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const TokenVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized API request, token not provided.",
      });
    }
    const deCoded = jwt.verify(token!, process.env.SECRET_JWT_USER!);
    req.body.webDecoded = deCoded;
    next();
  } catch (error) {
    console.log("Token error", error);
    return res.status(500).json({
      status: false,
      message: "Unauthorized API request.",
    });
  }
};

export default TokenVerify;
