import {createSlice} from "@reduxjs/toolkit";
import {authThunkCreator} from "./thunk-creators";


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: localStorage.isAuth || false,
    token: localStorage.token || ''
  },
  reducers: {},
  extraReducers: {
    [authThunkCreator.fulfilled]: (state, {payload}) => {
      state.isAuth = true;
      state.token = payload.token;

      localStorage.isAuth = true;
      localStorage.token = payload.token;
    },
    [authThunkCreator.rejected]: (state, action) => {
      return action;
    },
    [authThunkCreator.pending]: (state, action) => {
      console.log('pending')
    }
  }
})