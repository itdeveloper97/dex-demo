import React, {useEffect} from "react";
import s from "../AllItems/AllItems.module.css";
import {NavLink} from "react-router-dom";
import btn from "../../../assets/commonStyles/Button.module.css";
import ListProperty from "./ListProperty/ListProperty";
import {connect} from "react-redux";
import {getPropertiesBySearchTC, getPropertiesTC} from "../../../redux/thunk-creators/property-thunk-creators";
import Pagination from "../../common/Pagination/Pagination";
import SearchElement from "../../common/SearchElement/SearchElement";

function AllProperty(props) {

  useEffect(() => {
    props.getPropertiesTC(props.currentPage);
  }, [])

  return (
    <div className={s.allItemsSection}>
      <div>
        <div className={s.nav}>
          <NavLink to={`/add-property`} className={`${btn.yellowBtn} ${s.link}`}>Добавить проперти</NavLink>
        </div>
        <SearchElement
          send={props.getPropertiesBySearchTC}
        />
        <ListProperty
          currentPage={props.currentPage}
        />
      </div>
      <div>
        <Pagination
          currentPage={props.currentPage}
          arrPages={props.arrPages}
          getPages={props.getPropertiesTC}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  propertyColumn: state.property.propertyColumn,
  items: state.property.items,
  currentPage: state.property.currentPage,
  arrPages: state.property.arrPages,
})

export default connect(mapStateToProps, {
  getPropertiesTC,
  getPropertiesBySearchTC
})(AllProperty);