import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Noti} from 'src/interface/notification/getNoti';

interface NotificationState {
  notifications: Noti[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationSlice(state, action: PayloadAction<Noti[]>) {
      state.notifications = action.payload;
    },
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload;
    },
    addUnreadCount(state) {
      state.unreadCount += 1;
    },
    addNotification(state, action: PayloadAction<Noti>) {
      state.notifications.push(action.payload);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        (n: {_id: string}) => n._id === action.payload,
      );
      if (notification) {
        notification.isRead = true;
      }
    },
  },
});

export const {
  setUnreadCount,
  addNotification,
  markAsRead,
  setNotificationSlice,
  addUnreadCount,
} = notificationSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications;
export const selectunreadCount = (state: RootState) =>
  state.notifications.unreadCount;
export default notificationSlice.reducer;
