import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentDirectory: localStorage.getItem("currentDirectory")?localStorage.getItem("currentDirectory"):null,
    projectID: localStorage.getItem("projectID")?localStorage.getItem("projectID"):null,
    currentProjectFileMap: localStorage.getItem("currentProjectFileMap")?new Map(JSON.parse(localStorage.getItem("currentProjectFileMap"))):new Map(),
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
        setCurrentProjectFileMap: (state, action) => {
            state.currentProjectFileMap = action.payload;
            localStorage.setItem("currentProjectFileMap", JSON.stringify(Array.from(action.payload.entries())));
        },
        setCurrentFileURL: (state, action) => {
            state.currentFileURL = action.payload;
            localStorage.setItem("currentFileURL", action.payload);
        }
    }
});

export const { setCurrentDirectoryContext, setProjectID, setCurrentProjectFileMap, setCurrentFileURL } = fileSlice.actions;
export default fileSlice.reducer;