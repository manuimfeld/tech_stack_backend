import express from "express";
import { AuthController } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", AuthController.postRegister);

router.post("/login", AuthController.postLogin);

export default router;
