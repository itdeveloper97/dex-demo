import React from "react";
import {Field, reduxForm} from "redux-form";
import {checkEmail, required} from "../../../utils/validators/validators";
import {Input} from "../../common/FormControls/FormsControl";
import s from "./LoginForm.module.css";
import btn from "../../../assets/commonStyles/Button.module.css";
import {compose} from "redux";



function LoginForm(props) {
  return (
    <form onSubmit={props.handleSubmit} className={s.loginForm}>
      <div className={s.fieldBlock}>
        <div><label className={s.label}>Логин/Email</label></div>
        <Field component={Input} type="text" name={'email'} placeholder='Введите email' validate={[required, checkEmail]} className={s.input}/>
      </div>
      <div className={s.fieldBlock}>
        <div><label className={s.label}>Пароль</label></div>
        <Field component={Input} type="password" name={'password'} placeholder='Введите пароль' validate={[required]} className={s.input}/>
      </div>
      <div className={s.buttonSubmitBlock}>
        <button className={btn.yellowBtn}>Войти</button>
      </div>
    </form>
  )
}

export default compose(
  reduxForm({
    form: 'login'
  })
)(LoginForm);