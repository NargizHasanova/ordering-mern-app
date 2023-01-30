import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()
dotenv.config()

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/rooms", roomsRoute)
app.use("/hotels", hotelsRoute)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB ok"))
    .catch(err => console.log('DB error', err))
    
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen("5000", () => {
    console.log("backend is runnig");
})