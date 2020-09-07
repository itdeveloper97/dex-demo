import React, {useEffect} from "react";
import s from "./ListItems.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {changeOrderTC, deleteProductTC} from "../../../../redux/thunk-creators/catalog-thunk-creators";
import {NavLink} from "react-router-dom";
import swal from "sweetalert";

function ListItems(props) {


  function changeOrder() {
    props.changeOrderTC();
  }

  function deleteItem(e) {
    props.deleteProductTC(e.target.id).then((response) => {
      if(response.status === 200) {
        swal({
          title: "Товар успешно удален",
          icon: "success"
        })
      } else {
        swal({
          title: "Что то пошло не так",
          icon: "error"
        })
      }
    });
  }

  return (
    <div className={s.list}>
      <div className={s.tr}>
        <div
          id={props.sort}
          className={`${s.th} ${s.thAfter} toggle`}
          onClick={changeOrder}
        >
          Перечень товаров
        </div>
        <div className={`${s.th} ${s.thThink}`}>
          Стоимость
        </div>
        <div className={`${s.th} ${s.thThink}`}>
          Дата изменения
        </div>
        <div className={`${s.th} ${s.thThink}`}>
          Управление
        </div>
      </div>

      {
        props.items.map(item => {
          return (<div className={s.tr} key={item.id}>
            <div className={`${s.td}`}>
              <div className={`${s.linkToCard}`}>
                <NavLink to={`/item-card/${item.id}`}>
                  {item.name}
                </NavLink>
              </div>
            </div>
            <div className={s.td}>
              {item.price}
            </div>
            <div className={`${s.td}`}>
              {item.dateOfChange}
            </div>
            <div className={`${s.td} ${s.spaceBetween}`}>
              <div
                className={s.editProperty}
                id={item.id}
              >
                <NavLink to={`/add-item/${item.id}`}>
                  Ред.
                </NavLink>
              </div>
              <div
                className={s.deleteProperty}
                onClick={deleteItem}
                id={item.id}
              >
                Удалить
              </div>
            </div>
          </div>)
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  items: state.catalog.items
})

export default compose(
  connect(mapStateToProps, {
    changeOrderTC,
    deleteProductTC
  })
)(ListItems);