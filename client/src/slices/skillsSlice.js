import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://personal-portfolio-4-6sjn.onrender.com/api/skills";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchSkills = createAsyncThunk("skills/fetchAll", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const createSkill = createAsyncThunk(
  "skills/create",
  async (payload) => {
    const res = await axios.post(API, payload, { headers: getAuthHeader() });
    return res.data;
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`, { headers: getAuthHeader() });
    return id;
  }
);

export const updateSkill = createAsyncThunk(
  "skills/update",
  async ({ id, data }) => {
    const res = await axios.patch(`${API}/${id}`, data, { headers: getAuthHeader() });
    return res.data;
  }
);

const skillsSlice = createSlice({
  name: "skills",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.items = state.items.map((sk) => (sk._id === action.payload._id ? action.payload : sk));
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.items = state.items.filter((sk) => sk._id !== action.payload);
      });
  }
});

export default skillsSlice.reducer;







