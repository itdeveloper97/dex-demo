import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../api/User/User";

export const authThunkCreator = createAsyncThunk(
  'auth/setAuth',
  ({email, password}) => {
    return userAPI.login({email, password})
  }
)