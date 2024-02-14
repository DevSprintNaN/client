import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentDirectory: localStorage.getItem("currentDirectory")?localStorage.getItem("currentDirectory"):null,
    projectID: localStorage.getItem("projectID")?localStorage.getItem("projectID"):null,
    currentFileURL: localStorage.getItem("currentFileURL")?localStorage.getItem("currentFileURL"):null
}

export const fileSlice = createSlice({
    name: "userState",
    initialState,
    reducers: {
        setCurrentDirectoryContext: (state, action) => {
            state.currentDirectory = action.payload;
            localStorage.setItem("currentDirectory", action.payload);
        },
        setProjectID: (state, action) => {
            state.projectID = action.payload;
            localStorage.setItem("projectID", action.payload);
        },
        setCurrentFileURL: (state, action) => {
            state.currentFileURL = action.payload;
            localStorage.setItem("currentFileURL", action.payload);
        }
    }
});

export const { setCurrentDirectoryContext, setProjectID, setCurrentFileURL } = fileSlice.actions;
export default fileSlice.reducer;