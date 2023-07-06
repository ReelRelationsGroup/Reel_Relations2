import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDegreesOfSeparation = createAsyncThunk(
  "degreesOfSeparation/fetchDegreesOfSeparation",
  async (casts1Id, casts2Id) => {
    try {
      const response = await axios.get(
        `/api/casts/degrees-of-separation/${casts1Id}/${casts2Id}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
);

const degreesOfSeparationSlice = createSlice({
  name: "degreesOfSeparation",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDegreesOfSeparation.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default degreesOfSeparationSlice.reducer;