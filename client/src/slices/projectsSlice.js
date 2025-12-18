import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://personal-portfolio-4-6sjn.onrender.com/api/projects";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (payload) => {
    const res = await axios.post(API, payload, { headers: getAuthHeader() });
    return res.data;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`, { headers: getAuthHeader() });
    return id;
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, data }) => {
    const res = await axios.patch(`${API}/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.items = state.items.map((p) => (p._id === action.payload._id ? action.payload : p));
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  }
});

export default projectsSlice.reducer;






