import express from "express";
import HomeController from "../../controllers/homeController.js";
import authMiddleware from "../middlewares/auth/authMiddleware.js";

export default function () {
  const router = express.Router();
  const Controllers = new HomeController();

    router.get("/", [authMiddleware],Controllers.indexPage);

  return router;
}
