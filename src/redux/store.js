import { configureStore } from '@reduxjs/toolkit'
import contactSlice from './contactSlice'
import loginSlice from './loginSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    contact: contactSlice
  }
})
