import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotelRooms, getSingleHotel, updateHotel } from "../controllers/hotel.js";
// import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router()

// CREATE
router.post("/", createHotel)

// UPDATE
router.put("/:id", updateHotel)

// DELETE
router.delete("/:id", deleteHotel)

// GET SINGLE
router.get("/findById/:id", getSingleHotel)

// GET ALL
router.get("/", getAllHotels)
// /hotels/countByCity?cities=Berlin,London,Madrid

// COUNT BY CITY
router.get("/countByCity", countByCity) // +

// COUNT BY TYPE
router.get("/countByType", countByType) // +

// GET HOTEL ROOMS
router.get("/room/:hotelId", getHotelRooms)


export default router