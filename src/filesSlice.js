import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: (files, action) => {
      return [...files, action.payload];
    },
    addFileEvent: (files, action) => {
      files.forEach((file) => {
        if (file.id === action.payload.id) {
          file.events.push(action.payload.ev)
        }
      });
      return files;
    },
  },
});

export const { addFile, addFileEvent } = filesSlice.actions;

export default filesSlice.reducer;
