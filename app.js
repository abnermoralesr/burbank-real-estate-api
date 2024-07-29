import express from "express";
import cors from "cors";
import propertyRoute from "./routes/api/v1/property.route.js";
import authRoute from "./routes/api/v1/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
const apiPath = '/api/';
const version  = 'v1/'

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use(apiPath + version + "property", propertyRoute);
app.use(apiPath + version + "auth", authRoute);
app.listen(8800, ()=> {
    console.log(apiPath + version + "property");
    console.log(apiPath + version + "test");
    console.log("Server is running!")
});