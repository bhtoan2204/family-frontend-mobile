import { combineReducers } from 'redux';
import webSocketReducer from './webSocketSlice';

const rootReducer = combineReducers({
  webSocket: webSocketReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

