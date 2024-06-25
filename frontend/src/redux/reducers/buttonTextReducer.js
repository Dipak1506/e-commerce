import { createSlice } from '@reduxjs/toolkit'


export const buttonTextSlice = createSlice({
  name: 'buttonText',
  initialState: {
    currentState: "SignIn",
  },
  reducers: {
    setButtonText: (state,action) => {
      state.currentState = action.payload;
    },
  
  },
})

// Action creators are generated for each case reducer function
export const {setButtonText} = buttonTextSlice.actions

export default buttonTextSlice.reducer