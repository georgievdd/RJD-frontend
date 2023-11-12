import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import balanceReducer from './slices/balance';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
  },
})
