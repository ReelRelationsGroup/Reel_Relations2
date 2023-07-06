const { createAsyncThunk, createSlice} = require("@reduxjs/toolkit");
const  axios  = require("axios");


const fetchFavoriteMovies = createAsyncThunk('getFavoriteMovies', async () => {
    try {
        const token = window.localStorage.getItem("token");
        const response = await axios.get("/api/favorites/movies", {
            headers: {
                authorization: token
            }
        });
        return response.data
    } catch (e) {
        console.log(e);
    }
});

const addFavoriteMovie = createAsyncThunk('addFavoriteMovie', async (movieId) => {
    try {
        const token = window.localStorage.getItem("token");
        const response = await axios.post("/api/favorites/movie", {movieId}, {
            headers: {
                authorization: token
            }
        });
        return response.data
    } catch (e) {
        console.log(e);
    }
});

const deleteFavoriteMovie = createAsyncThunk('deleteFavoriteMovie', async (id) => {
    try {
        const token = window.localStorage.getItem("token");
        const response = await axios.delete(`/api/favorites/movie/${id}`, {
            headers: {
                authorization: token
            }
        });
        return response.data
    } catch (e) {
        console.log(e);
    }
})

const favoriteMovieSlice = createSlice({
    name: "favoriteMovies",
    initialState: [],
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addFavoriteMovie.fulfilled, (state, action) => {
            return [...state, action.payload]
        });
        builder.addCase(deleteFavoriteMovie.fulfilled, (state, action) => {
            return state.filter((movie) => movie.id !== action.payload.id)
        });
    }
})


export default favoriteMovieSlice.reducer;
export {fetchFavoriteMovies, addFavoriteMovie, deleteFavoriteMovie};