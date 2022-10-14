import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './features/modalSlice'
export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
})
