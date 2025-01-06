import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("user/createUser", () => {

})


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: false,
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export default userSlice.reducer