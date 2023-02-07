import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";


//istifade eleme
export const getRoom = createAsyncThunk("room/fetchRoom",
    async (hotelId) => {
        const { data } = await Axios.get(`rooms/${hotelId}`)
        return data
    }
)

export const getHotelRooms = createAsyncThunk("room/getHotelRooms",
    async (hotelId) => {
        const { data } = await Axios.get(`rooms/getHotelRooms/${hotelId}`)
        return data
    }
)

export const updateRoomAvailability = createAsyncThunk("room/updateRoomAvailability",
    async ({ roomId, unavailableDates }) => {
        const { data } = await Axios.put(`rooms/availability/${roomId}`, { unavailableDates })
        return data
    }
)

const initialState = {
    roomLoading: true,
    roomsData: [],
    room: {}
}

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        nese: (state) => {

        },
    },
    extraReducers: {
        [getRoom.pending]: (state) => {
            state.roomLoading = true
        },
        [getRoom.fulfilled]: (state, { payload }) => {
            state.room = payload
            state.roomLoading = false
        },
        [getRoom.rejected]: (state, action) => {
            state.error = action.error.message
            state.roomLoading = false
        },
        [getHotelRooms.fulfilled]: (state, { payload }) => {
            state.roomsData = payload
            state.roomLoading = false
        },
        [updateRoomAvailability.fulfilled]: (state, { payload }) => {
            state.roomsData = payload
            state.roomLoading = false
        }
    }
})


export const { nese } = roomsSlice.actions

export default roomsSlice.reducer
