import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";

export const getHotels = createAsyncThunk("hotels/fetchHotels",
    async ({ minPrice = 1, maxPrice = 999, limit = 4 }) => {
        const { data } = await Axios.get(`/hotels/?min=${minPrice}&max=${maxPrice}&limit=${limit}`)
        return data
    }
)

export const getHotelsByPropertyType = createAsyncThunk("hotels/fetchProperty",
    async () => {
        const { data } = await Axios.get(`/hotels/countByType`)
        return data
    }
)

export const getHotelsCountByCity = createAsyncThunk("hotels/fetchCount",
    async (cities = "Berlin,London,Madrid") => {
        const { data } = await Axios.get(`/hotels/countByCity?cities=${cities}`)
        return data
    }
)

const initialState = {
    hotelsData: [],
    hotelsCountByCity: [], //[5, 10, 0]
    hotelsPropTypes: [], // [{type:"hotel",count: 3}, {type:"apartment",count: 5}]
    loading: true,
    error: false,
    hotel: null,
    hotelComments: []
}

export const hotelsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        nese: (state) => {

        },
    },
    extraReducers: {
        [getHotelsCountByCity.pending]: (state) => {
            state.loading = true
        },
        [getHotelsCountByCity.fulfilled]: (state, { payload }) => {
            state.hotelsCountByCity = payload
            state.loading = false
        },
        [getHotelsCountByCity.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.loading = false
        },
        [getHotelsByPropertyType.pending]: (state) => {
            state.loading = true
        },
        [getHotelsByPropertyType.fulfilled]: (state, { payload }) => {
            state.hotelsPropTypes = payload
            state.loading = false
        },
        [getHotelsByPropertyType.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.loading = false
        },
        [getHotels.pending]: (state) => {
            state.loading = true
        },
        [getHotels.fulfilled]: (state, { payload }) => {
            state.hotelsData = payload
            state.loading = false
        },
        [getHotels.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.loading = false
        }
    }
})


export const { nese } = hotelsSlice.actions

export default hotelsSlice.reducer
