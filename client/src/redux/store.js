import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./usersSlice"
import hotelsReducer from "./hotelsSlice"
import roomsReducer from "./roomsSlice"

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        rooms: roomsReducer,
        users: usersReducer
    }
})

