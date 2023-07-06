import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchActorById = createAsyncThunk(
  "singleActor/fetchActorById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits%2C%20images&language=en-US&api_key=8ef1c18c56bc6d0d2ff280c6fd0b854d`
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const singleActorSlice = createSlice({
  name: "singleActor",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActorById.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchActorById.rejected, (state, action) => {
      // handle the rejected case and set the state
      return "Error occurred while fetching the actor";
    });
  },
});

export default singleActorSlice.reducer;