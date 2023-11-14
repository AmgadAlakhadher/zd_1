import { PayloadAction, createSlice } from '@reduxjs/toolkit'



const initialState = {
  isDark: false,
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    onChangeMode: (state,{payload}:PayloadAction<boolean>)=>{
      state.isDark = payload;
      localStorage.setItem("isDark", payload.toString());
    },
  },
})

export const { actions: darkModeActions } = darkModeSlice;
export const { reducer: darkModeReducer } = darkModeSlice;