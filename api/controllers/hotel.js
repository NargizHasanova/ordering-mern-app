import Property from "../models/Property.js";
import Room from "../models/Room.js";

// CREATE HOTEL
export const createHotel = async (req, res, next) => {
    try {
        const newHotel = new Property(req.body)
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
}

export const getHotelsList = async (req, res, next) => {
    const { min, max, ...others } = req.query; // bele yazmaqda meqsed oduki min ve max-a sert 
    try {
        const hotelsList = await Property
            .find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 999 } })
            .limit(req.query.limit)
        res.status(200).json(hotelsList)
    } catch (err) {
        next(err)
    }
}

// GET ALL HOTELS
export const getTopHotels = async (req, res, next) => { //+
    // req.query = { min: '499', max: '1000', name: 'hotel', limit: '4' }
    const { min, max, ...others } = req.query; // bele yazmaqda meqsed oduki min ve max-a sert yazaciq deye olari destructure edirik.Yoxsa ele Property.find(req.query) birbasa yaza bilerdik
    // others = { name: 'hotel', limit: '4' }
    try {
        const allHotels = await Property
            .find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 999 } })
            .limit(req.query.limit)
        res.status(200).json(allHotels)
    } catch (err) {
        next(err)
    }
}

// GET SINGLE HOTEL
export const getSingleHotel = async (req, res, next) => {
    try {
        const singleHotel = await Property.findById(req.params.id)
        res.status(200).json(singleHotel)
    } catch (err) {
        next(err)
    }
}

// DELETE HOTEL
export const deleteHotel = async (req, res, next) => {
    try {
        await Property.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted successfully")
    } catch (err) {
        next(err)
    }
}

// UPDATE HOTEL
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Property.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true }
        )
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

// COUNT BY CITY 
export const countByCity = async (req, res, next) => { //+
    try {
        const cities = req.query.cities.split(",") // ["berin", "seki"]
        const list = await Promise.all(
            cities.map(item => {
                return Property.countDocuments({ city: item })
            })
        )
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

// COUNT BY TYPE
export const countByType = async (req, res, next) => { //+
    try {
        const hotelCount = await Property.countDocuments({ type: "hotel" });
        const apartmentCount = await Property.countDocuments({ type: "apartment" });
        const resortCount = await Property.countDocuments({ type: "resort" });
        const villaCount = await Property.countDocuments({ type: "villa" });
        const cabinCount = await Property.countDocuments({ type: "cabin" });

        res.status(200).json(
            [
                { type: "hotels", count: hotelCount },
                { type: "apartments", count: apartmentCount },
                { type: "resorts", count: resortCount },
                { type: "villas", count: villaCount },
                { type: "cabins", count: cabinCount },
            ]
        );
    } catch (err) {
        next(err);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Property.findById(req.params.hotelId);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}