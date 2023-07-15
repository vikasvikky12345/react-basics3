import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import inboxReducer from './inboxSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  inbox: inboxReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
