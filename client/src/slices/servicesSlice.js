import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://personal-portfolio-4-6sjn.onrender.com/api/services";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchServices = createAsyncThunk("services/fetchAll", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const createService = createAsyncThunk(
  "services/create",
  async (payload) => {
    const res = await axios.post(API, payload, { headers: getAuthHeader() });
    return res.data;
  }
);

export const deleteService = createAsyncThunk(
  "services/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`, { headers: getAuthHeader() });
    return id;
  }
);

export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, data }) => {
    const res = await axios.patch(`${API}/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.items = state.items.map((s) => (s._id === action.payload._id ? action.payload : s));
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  }
});

export default servicesSlice.reducer;







