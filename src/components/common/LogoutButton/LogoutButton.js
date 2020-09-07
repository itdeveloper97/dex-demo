import React from "react";
import {connect} from "react-redux";
import {logout} from "../../../redux/reducers/auth-reducers";
import btn from "../../../assets/commonStyles/Button.module.css";

function LogoutButton(props) {

  const onLogOut = () => {
    props.logout();
  }

  return <button className={btn.yellowBtn} onClick={onLogOut}>Выйти</button>
}


export default connect(null, {
  logout
})(LogoutButton);