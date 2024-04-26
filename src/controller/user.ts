import userModel from "../models/user";
import { Request, Response } from "express";

export const postPaoController = async (req: Request, res: Response) => {
  try {
    // console.log("DATAAAAAAAAAAA", req.body);
    const { phoneNumber, firstName, lastName, dob } = req.body;
    await userModel.create({
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
    });

    return res.status(200).json({ message: "API send sucessfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getPaoController = async (req: Request, res: Response) => {
  try {
    // console.log("DATAAAAAAAAAAA", req.body);
    // console.log(req.body.webDecoded, "webDecoded");
    const id = req.body.webDecoded.id;
    console.log(id, "IDDDDDDDDDD");
    const userById = await userModel.findById(id);

    return res
      .status(200)
      .json({ message: "API send sucessfully", data: userById });
  } catch (error) {
    console.log(error);
  }
};
