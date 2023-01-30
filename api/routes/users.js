import express from "express";
import { deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

// UPDATE USER
router.put("/:id", verifyToken, verifyUser, updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

// GET USER
router.get("/:id", verifyToken, verifyUser, getSingleUser);

// GET ALL USER
router.get("/", getAllUsers);

export default router