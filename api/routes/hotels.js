import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getTopHotels, getHotelRooms, getSingleHotel, updateHotel, getHotelsList } from "../controllers/hotel.js";
// import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router()

// CREATE
router.post("/", createHotel)

// GET HOTELS LIST
router.get("/list",getHotelsList)

// UPDATE
router.put("/:id", updateHotel)

// DELETE
router.delete("/:id", deleteHotel)

// GET SINGLE
router.get("/findById/:id", getSingleHotel)

// GET ALL
router.get("/", getTopHotels) //+
// /hotels/countByCity?cities=Berlin,London,Madrid

// COUNT BY CITY
router.get("/countByCity", countByCity) // +

// COUNT BY TYPE
router.get("/countByType", countByType) // +

// GET HOTEL ROOMS
router.get("/room/:hotelId", getHotelRooms)


export default router