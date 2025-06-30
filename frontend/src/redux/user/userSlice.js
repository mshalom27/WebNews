import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },

    signInSuccess: (state) => {
      state.user = action.payload
       state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    }

  },
})


export const { signInFailure, signInStart, signInSuccess } = userSlice.actions

export default userSlice.reducer