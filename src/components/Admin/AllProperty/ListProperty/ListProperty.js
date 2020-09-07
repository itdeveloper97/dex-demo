import React from "react";
import s from "./ListProperty.module.css";
import {compose} from "redux";
import {connect} from "react-redux";

import {
  changeSortPropsItemTC,
  deletePropertyTC,
  getPropertiesTC
} from "../../../../redux/thunk-creators/property-thunk-creators";
import swal from "sweetalert";

function ListProperty(props) {

  function deleteProperty(e) {
    props.deletePropertyTC(e.target.id, props.currentPage).then((response) => {
      if(response.status === 200) {
        swal({
          title: "Свойство удалено",
          icon: "success"
        })
      } else {
        swal({
          title: "Что то пошло не так",
          icon: "warning"
        })
      }
    });

  }

  function changeOrder() {
    props.changeSortPropsItemTC(props.sort, props.order);

    // props.getPropertiesTC(props.currentPage, LIMIT, false, props.order);
  }

  return (<div className={s.list}>
    <div className={s.tr}>
      <div
        id={props.sort}
        className={`${s.th} ${s.thAfter} toggle`}
        onClick={changeOrder}
      >
        Перечень проперти
      </div>
      <div className={`${s.th} ${s.thThink}`}>
        Тип
      </div>
      <div className={`${s.th} ${s.thThink}`}>
        id
      </div>
      <div className={`${s.th} ${s.thThink}`}>
        Управление
      </div>
    </div>

    {
      props.items.map(item => {
        return (<div className={s.tr} key={item.id}>
          <div className={s.td}>
            {item.name}
          </div>
          <div className={s.td}>
            {item.type}
          </div>
          <div className={`${s.td}`}>
            {item.id}
          </div>
          <div className={`${s.td} ${s.textRight}`}>
            <div className={s.deleteProperty} onClick={deleteProperty} id={item.id}>Удалить</div>
          </div>
        </div>)
      })
    }
  </div>)
}

const mapStateToProps = (state) => ({
  items: state.property.items,
  currentPage: state.property.currentPage,
  order: state.property.order,
  sort: state.property.sort
})

export default compose(
  connect(mapStateToProps, {
    getPropertiesTC,
    deletePropertyTC,
    changeSortPropsItemTC
  })
)(ListProperty);