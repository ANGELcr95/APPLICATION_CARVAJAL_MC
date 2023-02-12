import { configureStore } from '@reduxjs/toolkit'
import coreSlice from './coreSlice'
import defaultSlice from './defaultSlice'
import loginSlice from './loginSlice'

export const store = configureStore({
  reducer: {
    default: defaultSlice,
    login: loginSlice,
    core: coreSlice
  }
})
