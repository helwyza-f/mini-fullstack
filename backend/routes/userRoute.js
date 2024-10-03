import express from "express";
import { login, logout, getUsers } from "../controller/userController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/users").get(getUsers);

export default router;
