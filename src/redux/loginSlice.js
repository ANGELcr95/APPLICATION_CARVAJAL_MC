import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    token: null
  },
  reducers: {
    setLogin (state, action) {
      state.user = action.payload
    },
    setToken (state, action) {
      state.token = action.payload
    }
  }
})

export const { setLogin, setToken } = loginSlice.actions

export default loginSlice.reducer
