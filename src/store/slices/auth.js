import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: '',
  name : '',
  access: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
})

// Action clients are generated for each case reducer function
export const { } = authSlice.actions

export default authSlice.reducer