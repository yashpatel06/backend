import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./config/db";
import mainRoute from "./routes/mainRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();
connect();
const corsOptions: Object = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("", mainRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to EWW.");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}.`);
});
