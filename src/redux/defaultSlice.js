import { createSlice } from '@reduxjs/toolkit'

let nextTodoId = 0

const defaultSlice = createSlice({
  name: 'default',
  initialState: [],
  reducers: {
    setDefault (state, action) {
      state.push({ id: nextTodoId++, text: action.payload, completed: false })
    }
  }
})

export const { setDefault } = defaultSlice.actions

export default defaultSlice.reducer
