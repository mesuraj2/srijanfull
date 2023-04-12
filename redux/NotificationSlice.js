import { createSlice } from '@reduxjs/toolkit';

const NotificationSlice = createSlice({
  name: 'notification',
  initialState: {
    noti: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.noti.push(action.payload)
    }
  },
});

export const NotificationReducer = NotificationSlice.reducer;
export const {
    addNotification,
} = NotificationSlice.actions;
