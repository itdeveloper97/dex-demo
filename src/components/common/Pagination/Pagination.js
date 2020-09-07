import React from "react";
import {compose} from "redux";
import s from "./Pagination.module.css";

function Pagination(props) {

  function onChangePage(e) {
    props.getPages(Number(e.target.id));
  }

  return (<div className={s.pagination}>
    {props.arrPages.map(item => {
      return (
        <div
          className={`${s.item} ${item === props.currentPage ? s.active : ''}`}
          onClick={onChangePage}
          key={item}
          id={item}
        >
          {item}
        </div>
      )
    })}
  </div>)
}

export default compose()(Pagination)