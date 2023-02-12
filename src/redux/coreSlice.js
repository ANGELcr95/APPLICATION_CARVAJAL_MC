import { createSlice } from '@reduxjs/toolkit'

const coreSlice = createSlice({
  name: 'core',
  initialState: {
    business: null,
    role: null
  },
  reducers: {
    setBusiness (state, action) {
      state.business = action.payload
    },
    setRole (state, action) {
      state.role = action.payload
    }
  }
})

export const { setBusiness, setRole } = coreSlice.actions

export default coreSlice.reducer
