import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {login, setAuth} from "../../redux/reducers/auth-reducers";
import s from './Login.module.css';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

function Login(props) {

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password);
  }

  return (
    <div className={s.loginContainer}>
      <div className={s.loginForm}>
        <h2 className={s.title}>Вход</h2>
        <LoginForm onSubmit={onSubmit}/>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({})

export default compose(
  connect(mapStateToProps, {
    login,
    setAuth
  }),
  withAuthRedirect
)(Login);