import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Notification} from 'src/interface/notification/getNoti';

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationSlice(state, action: PayloadAction<Notification[]>) {
      state.notifications = action.payload;
    },

    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        n => n._id === action.payload,
      );
      if (notification) {
        notification.isRead = true;
      }
    },
  },
});

export const {addNotification, markAsRead, setNotificationSlice} =
  notificationSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications;

export default notificationSlice.reducer;
