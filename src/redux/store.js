import { configureStore } from '@reduxjs/toolkit'
import contactSlice from 'redux/contactSlice'
import loginSlice from 'redux/loginSlice'

export const store = configureStore({
  reducer: {
    login: loginSlice,
    contact: contactSlice
  }
})
