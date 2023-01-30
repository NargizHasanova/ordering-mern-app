import User from "../models/User.js";

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (err) {
        next(err)
    }
}

// GET SINGLE USER
export const getSingleUser = async (req, res, next) => {
    try {
        const singleUser = await User.findById(req.params.id)
        res.status(200).json(singleUser)
    } catch (err) {
        next(err)
    }
}

// DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted successfully")
    } catch (err) {
        next(err)
    }
}

// UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true }
        )
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}