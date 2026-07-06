import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";
import { AuthRoutes } from "./modules/Auth/auth.route";


const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());


app.use(cors({
    origin : config.app_url,
    credentials : true,
}))


app.use("/api/users", userRoutes)
app.use("/api/auth", AuthRoutes)

export default app;