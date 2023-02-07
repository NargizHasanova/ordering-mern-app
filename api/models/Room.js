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
        property: { // room modeli hansi hotele(propertiye) aiddir
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
        otaqSayi: Number, // her otel nomrenin otaq sayi
        availability: {
            type: Boolean,
            default: true
        },
        bookedDate: { // otaq hansi tarixe bron edilib
            type: [Date]
        }
        // roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
    }
);

export default mongoose.model("Room", RoomSchema)