import React from "react";
import s from "./FormsControl.module.css";

const FormControl = ({input, meta, ...props}) => {

  const hasError = meta.touched && meta.error;

  return (
    <div>
      <div>
        {props.children}
      </div>
      <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
        {hasError && <span>{meta.error}</span>}
      </div>
    </div>
  )
}


export const Input = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}