import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: 'Initial notification message', show: false },
  reducers: {
    setNotification: (state, action) => {
      return {
        ...state,
        message: action.payload,
        show: true,
      };
    },
    clearNotification: (state) => {
      return {
        ...state,
        show: false,
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
