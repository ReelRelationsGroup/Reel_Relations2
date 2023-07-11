import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./auth";

const initialState = {
  usersList: [],
  status: "idle",
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        dispatch(logout());
        return rejectWithValue();
      }
      const response = await axios.get("/api/users", {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue();
    }
  }
);

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        dispatch(logout());
        return rejectWithValue();
      }
      const response = await axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue();
    }
  }
);

export const addUserProfile = createAsyncThunk(
  "addUserProfile",
  async (user) => {
    try {
      const { data } = await axios.post("/api/users", user);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateUser = createAsyncThunk("updateUser", async (updateData) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/users/${updateData.id}`,
      { data: updateData.data },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      window.alert(error.response.data);
    } else {
      console.log(error);
    }
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.usersList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload.error;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.usersList = action.payload;
      })
      .addCase(addUserProfile.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addUserProfile.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.usersList.push(action.payload);
      })
      .addCase(addUserProfile.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default userSlice.reducer;
