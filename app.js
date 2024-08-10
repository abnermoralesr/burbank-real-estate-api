import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "#routes/routes.js";

const app = express();
const apiPath = '/api/';
const version = ''

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

routes.map(route => {
    console.log(apiPath + version + route.base);
    app.use(apiPath + version + route.base, route);
})

app.listen(8800, ()=> {
    console.log("Server is running!")
});