import { createSlice } from '@reduxjs/toolkit'


export const isLoginSlice = createSlice({
  name: 'IsLogin',
  initialState: {
    currentState: false,
  },
  reducers: {
    setIsLogin: (state,action) => {
      state.currentState = action.payload;
    },
  
  },
})

// Action creators are generated for each case reducer function
export const {setIsLogin} = isLoginSlice.actions

export default isLoginSlice.reducer