import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router()

// REGISTER, CREATE USER
router.post("/register", register)

// LOGIN
router.post("/login", login)

export default router