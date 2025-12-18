import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./slices/servicesSlice.js";
import skillsReducer from "./slices/skillsSlice.js";
import projectsReducer from "./slices/projectsSlice.js";
import authReducer from "./slices/authSlice.js";

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    auth: authReducer
  }
});






