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
      console.log(action.payload)
      const updated = [...files].map((file) => {
        if (file.id === action.payload.id) {
          file.events = [...file.events, action.payload.event];
          return file;
        } else {
          return file;
        }
      });
      console.log(updated);
      return updated;
    },
  },
});

export const { addFile, addFileEvent } = filesSlice.actions;

export default filesSlice.reducer;
