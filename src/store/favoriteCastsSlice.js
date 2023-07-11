const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const fetchFavoriteCasts = createAsyncThunk("getFavoriteCasts", async () => {
  const token = window.localStorage.getItem("token");
  // Don't make the request if the token doesn't exist
  if (!token) return [];
  try {
    const response = await axios.get("/api/favorites/casts", {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

const addFavoriteCast = createAsyncThunk("addFavoriteCast", async (castId) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "/api/favorites/cast",
      { castId },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

const deleteFavoriteCast = createAsyncThunk(
  "deleteFavoriteCast",
  async (id) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.delete(`/api/favorites/cast/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const favoriteCastsSlice = createSlice({
  name: "favoriteCasts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteCasts.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addFavoriteCast.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(deleteFavoriteCast.fulfilled, (state, action) => {
      return state.filter((cast) => cast.id !== action.payload.id);
    });
  },
});

export default favoriteCastsSlice.reducer;
export { fetchFavoriteCasts, addFavoriteCast, deleteFavoriteCast };
