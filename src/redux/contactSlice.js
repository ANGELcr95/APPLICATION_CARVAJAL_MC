import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: null,
  },
  reducers: {
    setContact(state, action) {
      state.contact = action.payload;
    },
  },
});

export const { setContact } = contactSlice.actions;

export default contactSlice.reducer;
