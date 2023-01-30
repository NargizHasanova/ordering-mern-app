import express from "express";
import {
    createRoom,
    deleteRoom,
    getSingleRoom,
    getAllRooms,
    updateRoom,
    updateRoomAvailability,
    // updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", createRoom);

// UPDATE
router.put("/availability/:rumNumId", updateRoomAvailability);
router.put("/:id", updateRoom);

// DELETE
router.delete("/:id/:hotelid", deleteRoom);

// GET SINGLE
router.get("/:id", getSingleRoom);

// GET ALL
router.get("/", getAllRooms);

export default router;