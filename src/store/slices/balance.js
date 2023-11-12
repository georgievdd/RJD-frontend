import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
}

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    updateBalance(state, actions) {
      console.log(actions)
      state.balance = actions.payload;
    }
  },
})

// Action clients are generated for each case reducer function
export const { updateBalance } = balanceSlice.actions

export default balanceSlice.reducer