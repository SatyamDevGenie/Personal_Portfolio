import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create axios instance with default headers
const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("https://personal-portfolio-4-6sjn.onrender.com/api/auth/login", {
        username,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { token, user };
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(errorMsg);
    }
  }
);

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, action) => {
        s.loading = false;
        s.token = action.payload.token;
        s.user = action.payload.user;
        s.error = null;
      })
      .addCase(login.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload || action.error.message || "An error occurred";
        s.token = null;
        s.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

