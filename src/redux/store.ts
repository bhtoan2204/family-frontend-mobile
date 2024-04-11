import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import socketMiddleware from '../middleware/webSocketMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).prepend(socketMiddleware),
});

export default store;
