import { Request, Response } from "express";
import userModel from "../models/user";
import twilio, { Twilio } from "twilio";
import jwt from "jsonwebtoken";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;

console.log(accountSid, "accountSid");

const twilioClient = twilio(accountSid, authToken);

export const loginWithNumberController = async (
  req: Request,
  res: Response
) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber, "phoneNumber");
    const user = await userModel.findOne({ phoneNumber: phoneNumber });
    console.log(user, "USER");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // Store the OTP in memory (in a real application, you would store it securely and associate it with the user)
    await userModel.findOneAndUpdate(
      {
        phoneNumber: phoneNumber,
      },
      { otp: otp }
    );

    twilioClient.messages
      .create({
        body: `Your OTP for login is: ${otp}`,
        from: process.env.NUMBER!,
        to: `+91 ${phoneNumber}`,
      })
      .then(() => {
        res.json({ message: "OTP sent successfully" });
      })
      .catch((err) => {
        console.error("Error sending OTP:", err);
        res.status(500).json({ message: "Failed to send OTP" });
      });
  } catch (error) {}
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, otp } = req.body;
    const user = await userModel.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user?.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    } else {
      const userx = await userModel.findOneAndUpdate(
        {
          phoneNumber: phoneNumber,
        },
        { otp: null }
      );
      const token = jwt.sign(
        { phoneNumber: phoneNumber, id: userx?._id },
        process.env.SECRET_JWT_USER!
      );

      res.json({
        data: user,
        token: token,
        message: "OTP verified successfully",
      });
    }

    // Clear the OTP after successful verification
  } catch (error) {}
};
