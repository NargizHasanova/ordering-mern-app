import Room from "../models/Room.js";
import Property from "../models/Property.js";
import { createError } from "../utils/error.js";

// CREATE ROOM
export const createRoom = async (req, res, next) => {
    try {
        const newRoom = new Room(req.body)
        const savedNewRoom = await newRoom.save()
        await Property.findByIdAndUpdate(req.params.hotelid, { $push: { rooms: savedNewRoom._id } })
        res.status(201).json(savedNewRoom)
    } catch (err) {
        next(err)
    }
}

// UPDATE ROOM
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRooom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRooom)
    } catch (err) {
        next(err)
    }
}

// UPDATE ROOM AVAILABILITY
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.rumNumId },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.unavailableDates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};

// DELETE ROOM
export const deleteRoom = async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id)
        await Property.findByIdAndUpdate(req.params.hotelid, { $pull: { rooms: req.params.id } })
        res.status(200).json("Room has been deleted.")
    } catch (err) {
        next(err)
    }
}

// GET SINGLE ROOM
export const getSingleRoom = async (req, res, next) => {
    try {
        const singleRoom = await Room.findById(req.params.id)
        res.status(200).json(singleRoom)
    } catch (err) {
        next(err)
    }
}

// GET ALL ROOMS
export const getAllRooms = async (req, res, next) => {
    try {
        const allRooms = await Room.find()
        res.status(200).json(allRooms)
    } catch (err) {
        next(err)
    }
}
