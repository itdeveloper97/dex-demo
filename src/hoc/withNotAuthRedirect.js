import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

export const withNotAuthRedirect = (Component) => {
  function redirectComponent(props) {

    if(!props.isAuth) return <Redirect to={'/'}/>

    return <Component {...props}/>
  }

  const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthorized
  })

  return connect(mapStateToProps, {})(redirectComponent)
}