import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";


const app : Application = express();

app.use(cors({
    origin : config.app_url,
    credentials : true,
}))


export default app;