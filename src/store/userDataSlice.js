import { createSlice } from '@reduxjs/toolkit';

const lastUpdated = JSON.parse(localStorage.getItem('lastUpdated'));
if ((Date.now() - lastUpdated) / (1000 * 60) > 60) {
  localStorage.removeItem('persist:root');
}

let initialState = {
  value: [],
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    remove: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, remove } = userDataSlice.actions;

export default userDataSlice.reducer;
