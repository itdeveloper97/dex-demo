import React from "react";
import s from "./BackBtn.css";
import btn from "../../../assets/commonStyles/Button.module.css";
import {withRouter} from "react-router-dom";

function BackBtn(props) {

  function goBack(e) {
    e.preventDefault();
    props.history.goBack();
  }

  return <button className={`${btn.redBtn} ${s.btn}`} onClick={goBack}>Вернуться</button>
}

export default withRouter(BackBtn);