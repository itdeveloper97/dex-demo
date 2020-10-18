import React from "react";
import {Login} from "../components/Login/Login";
import {AddProperty} from "../components/Property/AddProperty/AddProperty";
import {AddProduct} from "../components/Product/AddProduct/AddProduct";
import {ListProduct} from "../components/Product/ListProduct/ListProduct";
import {ListProperty} from "../components/Property/ListProperty/ListProperty";
import {LoginRoute} from "../components/common/LoginRoute";
import {EditProduct} from "../components/Product/EditProduct/EditProduct";
import {CardProduct} from "../components/Product/CardProduct";

export const routes = [
  {
    path: "/",
    exact: true,
    main: () => <LoginRoute><Login/></LoginRoute>
  },
  {
    path: "/login",
    main: () => <LoginRoute><Login/></LoginRoute>
  },
  {
    path: "/add-property",
    main: () => <AddProperty/>
  },
  {
    path: "/add-product",
    main: () => <AddProduct/>
  },
  {
    path: "/all-product",
    main: () => <ListProduct/>
  },
  {
    path: "/all-property",
    main: () => <ListProperty/>
  },
  {
    path: "/edit-product/:productID",
    main: () => <EditProduct/>
  },
  {
    path: "/product/:productID",
    main: () => <CardProduct/>
  }
]