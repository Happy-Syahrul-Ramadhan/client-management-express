import express from "express";
import UserControllers from "../../controllers/userController.js";
import noAuthMiddleware from "../middlewares/auth/notLoginMiddleware.js";
import authMiddleware from "../middlewares/auth/authMiddleware.js";

export default function () {
  const router = express.Router();
  const Controllers = new UserControllers();

  router.get("/login",[noAuthMiddleware],Controllers.loginPage)
  router.get("/register",[noAuthMiddleware],Controllers.registerPage)
  router.get("/logout",[authMiddleware],Controllers.logout)
  router.post("/login",Controllers.login);
  router.post("/register",Controllers.register);
  router.post("/logout",Controllers.logout);

  return router;
}
