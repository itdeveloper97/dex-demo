import React, {useEffect, useState} from "react";
import s from "./ItemCard.module.css";
import {compose} from "redux";
import {withNotAuthRedirect} from "../../../hoc/withNotAuthRedirect";
import {withRouter, NavLink} from "react-router-dom";
import btn from "../../../assets/commonStyles/Button.module.css";
import {getProductTC} from "../../../redux/thunk-creators/catalog-thunk-creators";
import {connect} from "react-redux";
import Select from "react-select";
import './select.css';
import swal from "sweetalert";

function ItemCard(props) {

  const [product, setProduct] = useState({});
  const [productProps, changeProductProps] = useState([]);
  const [color, setColor] = useState("");

  useEffect(() => {
    if(props.match.params.productID) {
      props.getProductTC(props.match.params.productID).then((response) => {
        setProduct(response.data);
      })
    }


  }, [])

  function consoleProduct() {
    swal({
      title: "Товар добавлен в корзину",
      icon: "success"
    })
  }

  return (
    <div className={s.itemCardSection}>
      <div className={s.header}>
        <div className={s.link} onClick={props.history.goBack}>Вернуться</div>
      </div>
      <div className={s.dividingLine}></div>
      <div className={s.content}>
        <div className={s.leftBlock}>
          <div className={s.detailPicture}>
            <img src={product.image}/>
          </div>
          <div className={s.props}>

            {product.properties && product.properties.map((item, index) => {
              if(item.type === "Dropdown") {
                return (<div className={s.property} key={index}>
                  <div className={s.propNameDropdown}>{item.name}</div>
                  <Select
                    classNamePrefix="select"
                    className={s.select}
                    options={item.value}
                    onChange={(value) => {
                      console.log(value);
                    }}
                    defaultValue={item.value[0]}
                    placeholder={item.name}
                  />
                </div>)
              } else {
                return (<div className={s.property}  key={index}>
                  <div className={s.propName}>{item.name}</div>
                  <span className={s.propValueSmall}>{item.value}</span>
                </div>)
              }

            })}

            <div className={s.price}>
              <div className={s.priceName}>Стоимость</div>
              <span className={s.priceValue}>{product.price}$</span>
            </div>
          </div>
        </div>

        <div className={s.rightBlock}>
          <div className={s.description}>
            <h3 className={s.productName}>{product.name}</h3>
            <p>
              {product.description}
            </p>
          </div>
          <div className={s.buyButton}>
            <button className={btn.yellowBtn} onClick={consoleProduct}>Беру</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default compose(
  connect(null, {
    getProductTC
  }),
  withRouter,
)(ItemCard);