import express, { Router } from "express";
import webRouter from "./web/web";

const mainRoute: Router = express.Router();

mainRoute.use("/api/web", webRouter);

export default mainRoute;
