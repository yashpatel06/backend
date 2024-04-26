import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    dob: { type: Date, required: false },
    otp: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
