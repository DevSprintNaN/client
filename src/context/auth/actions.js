import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem("token")?localStorage.getItem("token"):null,
    authenticated: false
}

export const userSlice = createSlice({
    name: "user auth state",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload;
        }
    }
});

export const { setToken,setAuthenticated } = userSlice.actions;
export default userSlice.reducer;