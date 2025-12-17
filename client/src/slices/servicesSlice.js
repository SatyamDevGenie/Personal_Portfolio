import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Use your deployed backend URL here
const API = "https://personal-portfolio-4-6sjn.onrender.com/api/services";

// Get Authorization header if token exists
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ------------------- THUNKS -------------------

// Fetch all services
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Create a new service
export const createService = createAsyncThunk(
  "services/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, payload, { headers: getAuthHeader() });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Update an existing service
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API}/${id}`, data, { headers: getAuthHeader() });
      if (!res.data || !res.data._id) {
        return rejectWithValue("Update failed: invalid server response");
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Delete a service
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`, { headers: getAuthHeader() });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ------------------- SLICE -------------------

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // CREATE
      .addCase(createService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteService.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = "https://personal-portfolio-4-6sjn.onrender.com/api/services";

// const getAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// export const fetchServices = createAsyncThunk("services/fetchAll", async () => {
//   const res = await axios.get(API);
//   return res.data;
// });

// export const createService = createAsyncThunk(
//   "services/create",
//   async (payload) => {
//     const res = await axios.post(API, payload, { headers: getAuthHeader() });
//     return res.data;
//   }
// );

// export const deleteService = createAsyncThunk(
//   "services/delete",
//   async (id) => {
//     await axios.delete(`${API}/${id}`, { headers: getAuthHeader() });
//     return id;
//   }
// );

// export const updateService = createAsyncThunk(
//   "services/update",
//   async ({ id, data }) => {
//     const res = await axios.patch(`${API}/${id}`, data, { headers: getAuthHeader() });
//     return res.data;
//   }
// );

// const servicesSlice = createSlice({
//   name: "services",
//   initialState: { items: [], status: "idle" },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchServices.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(createService.fulfilled, (state, action) => {
//         state.items.unshift(action.payload);
//       })
//       .addCase(updateService.fulfilled, (state, action) => {
//         state.items = state.items.map((s) => (s._id === action.payload._id ? action.payload : s));
//       })
//       .addCase(deleteService.fulfilled, (state, action) => {
//         state.items = state.items.filter((s) => s._id !== action.payload);
//       });
//   }
// });

// export default servicesSlice.reducer;




