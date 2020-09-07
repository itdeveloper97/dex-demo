import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withNotAuthRedirect} from "../../hoc/withNotAuthRedirect";
import s from "./Admin.module.css";
import LogoutButton from "../common/LogoutButton/LogoutButton";
import {withRouter, Switch, Route, NavLink} from "react-router-dom";
import AllItems from "./AllItems/AllItems";
import AllProperty from "./AllProperty/AllProperty";
import AddItem from "./AddItem/AddItem";
import {getPropertiesTC} from "../../redux/thunk-creators/property-thunk-creators";
import {getAllPropsTC, getProductsTC} from "../../redux/thunk-creators/catalog-thunk-creators";

function Admin(props) {

  useEffect(() => {
    // props.getPropertiesTC(props.currentPage);
    // props.getProductsTC();
    // props.getAllPropsTC();
  }, []);

  return (<div className={s.adminSection}>
    <div className={s.menu}>
      <ul className={s.nav}>
        <li className={s.navLink}>
          <NavLink activeClassName={s.active} to={`${props.match.url}/all-items/`}>
            Листинг товаров
            <div className={s.gradient}></div>
          </NavLink>
        </li>
        <li className={s.navLink}>
          <NavLink activeClassName={s.active} to={`${props.match.url}/all-property/`}>
            Листинг проперти
            <div className={s.gradient}></div>
          </NavLink>
        </li>
      </ul>

      <div className={s.logout}>
        <LogoutButton/>
      </div>
    </div>

    <div>
      <Switch>
        <Route path={`${props.match.url}/all-items/`} render={() => <AllItems/>}/>
        <Route path={`${props.match.url}/all-property/`} render={() => <AllProperty/>}/>
        <Route path={`${props.match.url}/add-item`} render={() => <AddItem/>}/>
      </Switch>
    </div>
  </div>)
}

const mapStateToProps = (state) => ({
  currentPage: state.property.currentPage
})

export default compose(
  connect(mapStateToProps, {
  }),
  withNotAuthRedirect,
  withRouter
)(Admin);