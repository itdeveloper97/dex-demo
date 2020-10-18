import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import React from "react";

export const LoginRoute = ({children, ...rest}) => {

  const isAuth = useSelector(state => state.auth.isAuth);

  return <Route
    {...rest}
    render={() =>
      isAuth ? (
        <Redirect to={'/all-product'}/>
      ) : (
        children
      )}
  />

}