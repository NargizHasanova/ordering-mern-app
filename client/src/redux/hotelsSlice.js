import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";

export const getTopHotels = createAsyncThunk("hotels/fetchTopHotels",
    async ({ minPrice = 1, maxPrice = 999, limit = 4 }) => {
        const { data } = await Axios.get(`/hotels/?min=${minPrice}&max=${maxPrice}&limit=${limit}`)
        return data
    }
)

export const getPropertyCountByType = createAsyncThunk("hotels/fetchProperty",
    async () => {
        const { data } = await Axios.get(`/hotels/countByType`)
        return data
    }
)

export const getPropertyCountByCity = createAsyncThunk("hotels/fetchCountByCity",
    async (cities = "Berlin,London,Madrid") => {
        const { data } = await Axios.get(`/hotels/countByCity?cities=${cities}`)
        return data
    }
)

export const getHotelsList = createAsyncThunk("hotels/getHotelsList",
    // nonregistersensitive ele
    async ({ city, min, max, limit }) => {
        const { data } = await Axios.get(`/hotels/list?city=${city}&min=${min}&max=${max}&limit=${limit}`)
        return data
    }
)

export const getSingleHotel = createAsyncThunk("hotels/getHotel",
    async (hotelId) => {
        const { data } = await Axios.get(`/hotels/findById/${hotelId}`)
        return data
    }
)

const initialState = {
    destination: "",
    date: [],
    options: {},
    hotelsList: [],
    topHotelsData: [],
    hotelsCountByCity: [], //[5, 10, 0]
    hotelsPropTypes: [], // [{type:"hotel",count: 3}, {type:"apartment",count: 5}]
    loading: true,
    error: false,
    hotel: null,
    hotelComments: []
}

export const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        setOrderInfo: (state, { payload }) => {
            state.destination = payload.destination
            state.date = payload.date
            state.options = payload.options
        },
    },
    extraReducers: {
        [getPropertyCountByCity.pending]: (state) => {
            state.loading = true
        },
        [getPropertyCountByCity.fulfilled]: (state, { payload }) => {
            state.hotelsCountByCity = payload
            state.loading = false
        },
        [getPropertyCountByCity.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.loading = false
        },
        [getPropertyCountByType.pending]: (state) => {
            state.loading = true
        },
        [getPropertyCountByType.fulfilled]: (state, { payload }) => {
            state.hotelsPropTypes = payload
            state.loading = false
        },
        [getPropertyCountByType.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.loading = false
        },
        [getTopHotels.pending]: (state) => {
            state.loading = true
        },
        [getTopHotels.fulfilled]: (state, { payload }) => {
            state.topHotelsData = payload
            state.loading = false
        },
        [getTopHotels.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.loading = false
        },
        [getHotelsList.pending]: (state) => {
            state.loading = true
        },
        [getHotelsList.fulfilled]: (state, { payload }) => {
            state.hotelsList = payload
            state.loading = false
        },
        [getHotelsList.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.loading = false
        },
        [getSingleHotel.fulfilled]: (state, { payload }) => {
            state.hotel = payload
        },
        [getSingleHotel.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
        }
    }
})


export const { setOrderInfo } = hotelsSlice.actions

export default hotelsSlice.reducer