import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";


export const getRoom = createAsyncThunk("room/fetchRoom",
    async (hotelId) => {
        const { data } = await Axios.get(`/hotels/room/${hotelId}`)
        return data
    }
)

const initialState = {
    roomLoading: true,
    roomsData: []
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
            state.roomsData = payload
            state.roomLoading = false
        },
        [getRoom.rejected]: (state, action) => {
            state.error = action.error.message
            state.roomLoading = false
        }
    }
})


export const { nese } = roomsSlice.actions

export default roomsSlice.reducer
