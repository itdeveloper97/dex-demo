import React, {useEffect} from "react";
import s from "./AllItems.module.css";
import {withRouter, NavLink} from "react-router-dom";
import btn from "../../../assets/commonStyles/Button.module.css";
import ListItems from "./ListItems/ListItems";
import {connect} from "react-redux";
import {compose} from "redux";
import Pagination from "../../common/Pagination/Pagination";
import {
  getAllPropsTC,
  getPageTc,
  getProductsTC,
  searchProducts
} from "../../../redux/thunk-creators/catalog-thunk-creators";
import SearchElement from "../../common/SearchElement/SearchElement";


function AllItems(props) {

  useEffect(() => {
    props.getProductsTC();
    props.getAllPropsTC();
  }, [])


  return (
    <div className={s.allItemsSection}>
      <div>
        <div className={s.nav}>
          <NavLink to={`/add-item/`} className={`${btn.yellowBtn} ${s.link}`}>Добавить товар</NavLink>
        </div>
        <SearchElement
          send={props.searchProducts}
        />
        <ListItems/>
      </div>
      <div>
        <Pagination
          currentPage={props.currentPage}
          arrPages={props.arrPages}
          getPages={props.getPageTc}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentPage: state.catalog.currentPage,
  arrPages: state.catalog.settings.arrPages,
})

export default compose(
  connect(mapStateToProps, {
    getPageTc,
    searchProducts,
    getAllPropsTC,
    getProductsTC
  }),
  withRouter
)(AllItems);