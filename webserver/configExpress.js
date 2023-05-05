import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import expressEjsLayouts from "express-ejs-layouts";
export default function (app) {
  app.use(compression());
  app.use(express.json({ limit: "15mb" }));

  app.use(
    express.urlencoded({ limit: "15mb", extended: true, parameterLimit: 50000 })
  );
  app.set('view engine', 'ejs');
  app.use(express.static('../public'));
  app.use(cookieParser());
  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-type, Authorization, Cache-control, Pragma"
    );
    // Pass to next layer of middleware
    next();
  });
  app.use(morgan("combined"));
}
