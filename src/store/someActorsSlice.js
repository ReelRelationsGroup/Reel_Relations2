import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSomeActors = createAsyncThunk('fetchSomeActors', async (id) => {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits%2C%20images&language=en-US&api_key=8ef1c18c56bc6d0d2ff280c6fd0b854d`);
      return data;
    } catch (er) {
      console.log(er);
      throw er;
    }
});

export const clearSomeActors = createAsyncThunk('clearSomeActors',async() => {
    try {
        const empty = [];
        return empty;
    } catch (er) {
        console.log(er)
    }
})

const someActorsSlice = createSlice({
    name: "someActors",
    initialState: [],
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchSomeActors.fulfilled, (state,action) => {
            state.push(action.payload)
        })
        builder.addCase(clearSomeActors.fulfilled, (state,action) => {
            return action.payload
        })
    }
})

export default someActorsSlice.reducer;