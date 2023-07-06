import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchMovies = createAsyncThunk('fetchMovies', async()=>{
    try{
        const {data}  = await axios.get('/api/movies');
        return data;
    }catch(er){
        console.log(er);
    }
})

// what other asyncs do we need? fetching movies by actor? or are we gonna do a thing for movie_cast?

const moviesSlice = createSlice({
    name:"movies",
    initialState: [],
    reducers: {},
    extraReducers: (builder)=>{
      builder
      .addCase(fetchMovies.fulfilled, (state, action)=>{
        return action.payload;
      })
    }
})

export default moviesSlice.reducer;