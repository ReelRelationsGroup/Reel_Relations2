import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchActors = createAsyncThunk('fetchActors', async()=>{
    try{
        const {data}  = await axios.get('/api/actors');
        return data;
    }catch(er){
        console.log(er);
    }
});

// what other asyncs do we need? fetching actors by movie? or are we gonna do a thing for movie_cast?

const actorsSlice = createSlice({
    name:"actors",
    initialState: [],
    reducers: {},
    extraReducers: (builder)=>{
      builder
      .addCase(fetchActors.fulfilled, (state, action)=>{
        return action.payload;
      })
    }
})

export default actorsSlice.reducer;