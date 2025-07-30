// src/lib/redux/slices/locationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: []  // Changed from 'location' to 'locations' for clarity
  },
  reducers: {
    addLocation: (state, action) => {
      // Add the new location to the beginning of the array
      state.locations.unshift(action.payload);
      
      // Keep only unique locations (optional)
      state.locations = [...new Set(state.locations)];
      
      // Limit to last 3 locations (or any number you prefer)
      if (state.locations.length > 3) {
        state.locations = state.locations.slice(0, 3);
      }
    },
    clearLocations: (state) => {
      state.locations = [];
    }
  }
})

export const { addLocation, clearLocations } = locationSlice.actions;
export default locationSlice.reducer;