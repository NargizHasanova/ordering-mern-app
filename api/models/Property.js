import mongoose from "mongoose";
const { Schema } = mongoose

const PropertySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String, // hotel, resort, apartment, villa, cabin
            required: true,
        },
        city: {
            type: String, // berlin, baku, lissabon
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        distance: { // seherin merkezine qeder olan mesafe
            type: String,
            required: true,
        },
        photos: {
            type: [String], // array of strings
        },
        desc: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        rooms: { // hotelle room-u necese elagelendirmek lazimdi
            type: [String], // it will include rooms id's
        },
        pricePerNight: {
            type: Number,
            required: true,
        },
    }
);

export default mongoose.model("Property", PropertySchema)