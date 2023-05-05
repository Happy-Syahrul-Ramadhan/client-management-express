import express from "express";
import http from "http";
import mongoose from "mongoose";
import errorHandlingMiddlware from "./webserver/middlewares/errorHandlingMiddleware.js";
import configApp from "./webserver/configExpress.js";
import configServer from "./webserver/configServer.js";
import connectionDb from "./databases/connection.js";
import routesApp from "./webserver/routers/index.js";
import dotenv from "dotenv";
import config from "./config/config.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

// config App (Middleware,dll)

configApp(app);

configServer(app, mongoose, server, config).startServer();

connectionDb(mongoose, config, {
  autoIndex: false,
  connectTimeoutMS: 1000,
}).connectToMongo();

routesApp(app);

app.use(errorHandlingMiddlware);

server.listen(PORT, () => {
  console.log("Server Running.....");
});

// error costume error | 404 error
