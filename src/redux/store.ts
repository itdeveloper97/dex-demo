import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {authSlice} from "../components/Login/fake-auth-reducer";
import {propertySlice} from "../components/Property/property-reducer";
import {productSlice} from "../components/Product/product-reducer";
import {useDispatch} from "react-redux";

const middleware = [
  ...getDefaultMiddleware()
]

const reducer = {
  auth: authSlice.reducer,
  property: propertySlice.reducer,
  product: productSlice.reducer
}

export const store = configureStore({
  reducer,
  middleware
})

export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()