import express from "express";
import UserControllers from "../../controllers/userController.js";

export default function () {
  const router = express.Router();
  const Controllers = new UserControllers();

  router.post("/login",Controllers.login);
  router.post("/logout",Controllers.logout);
  router.post("/register",Controllers.register);
  router.post("/refresh",Controllers.refreshToken);

  return router;
}
