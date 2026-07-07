import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { AuthRoutes } from "./modules/Auth/auth.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { TechnicianRoutes } from "./modules/Technician/technician.route";
import { BookingRoutes } from "./modules/booking/booking.route";
import { ServiceRoutes } from "./modules/service/service.route";
import { PaymentRoutes } from "./modules/payment/payment.route";
import { AdminRoutes } from "./modules/Admin/admin.route";
import { ReviewRoutes } from "./modules/review/review.route";


const app : Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());


app.use(cors({
    origin : config.app_url,
    credentials : true,
}))


app.use("/api/auth", AuthRoutes)
app.use("/api/categories", CategoryRoutes)
app.use("/api/technician", TechnicianRoutes)
app.use("/api/booking", BookingRoutes)
app.use("/api/service", ServiceRoutes)
app.use("/api/payment", PaymentRoutes)
app.use("/api/admin", AdminRoutes)
app.use("/api/review", ReviewRoutes)

export default app;