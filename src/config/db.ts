import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUrl: string | undefined = "mongodb://127.0.0.1:27017";

const connect: Function = async () => {
  try {
    await mongoose.connect(mongoUrl!, { retryWrites: true, dbName: "paoDB" });
    console.log("Database connection established.");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};

export default connect;
