import mongoose from "mongoose";
const { Schema } = mongoose

const RoomSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        otaqSayi: Number, // her otel nomrenin otaq sayi
        unavailableDate: { // otaq hansi tarixe bron edilib
            type: [Date]
        }
        // roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
    }
);

export default mongoose.model("Room", RoomSchema)