import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended : true , limit : "20kb"}))
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";

//routes usage

app.use("/api/v1/users" , userRouter);
app.use("/api/v1/plant" , imageRouter);


app.use(errorHandler)
export {app}