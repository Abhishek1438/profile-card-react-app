import { createSlice } from '@reduxjs/toolkit';

const lastUpdated = JSON.parse(localStorage.getItem('lastUpdated'));
if ((Date.now() - lastUpdated) / (1000 * 60) > 60) {
  localStorage.removeItem('persist:root');
}

let initial_data = [];
const items = JSON.parse(localStorage.getItem('persist:root'));
if (!items) {
  await (async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await res.json();
    initial_data = json;
    localStorage.setItem('lastUpdated', JSON.stringify(Date.now()));
  })();
}

const initialState = {
  value: initial_data,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    remove: (state, action) => {
      console.log(action.payload);
      state.value = state.value.filter((user) => user.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, remove } = userDataSlice.actions;

export default userDataSlice.reducer;
