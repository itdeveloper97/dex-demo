import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";



export const withAuthRedirect = (Component) => {
    function RedirectComponent(props) {

        if(props.isAuth) return <Redirect to='/admin'/>

        return <Component {...props}/>
    }

    const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuthorized
    })

    return connect(mapStateToProps, {})(RedirectComponent);
}