import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getRoomBySearch = createAsyncThunk("hotel/fetchHotelBySearch",
    async (searchQuery) => {
        
    }
)

const initialState = {
    
}

export const roomsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        nese: (state) => {

        },
    },
    extraReducers: {
        [getRoomBySearch.pending]: (state) => {
            state.isLoading = true
        },
        [getRoomBySearch.fulfilled]: (state, { payload }) => {
            state.posts = payload.posts
            state.currentPage = payload.currentPage
            state.numberOfPages = payload.numberOfPages
            state.isLoading = false
        },
        [getRoomBySearch.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        }
    }
})


export const { nese } = roomsSlice.actions

export default roomsSlice.reducer
