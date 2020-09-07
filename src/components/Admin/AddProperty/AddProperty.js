import React from "react";
import {withNotAuthRedirect} from "../../../hoc/withNotAuthRedirect";
import {compose} from "redux";
import s from "./AddProperty.module.css";
import {withRouter} from "react-router-dom";
import AddPropertyForm from "./AddPropertyForm/AddPropertyForm";
import {connect} from "react-redux";
import {addPropertyTC} from "../../../redux/thunk-creators/property-thunk-creators";
import swal from "sweetalert";


function AddProperty(props) {

  function onAddProperty(formData) {
    props.addPropertyTC(props.lastElId, formData.propertyName, formData.propertyType)
      .then((response) => {
        if (response.error) {
          swal({
            title: response.errorMessage,
            icon: "error"
          })
        } else if(response.status) {
          swal({
            title: "Свойство добавлено",
            icon: "success"
          }).then(() => {
            props.history.goBack();
          })
        }
      })
  }

  return (<div className={s.addPropertySection}>
    <AddPropertyForm onSubmit={onAddProperty}/>
  </div>)
}

const mapStateToProps = (state) => ({
  lastElId: state.property.lastElId
})

export default compose(
  connect(mapStateToProps, {
    addPropertyTC
  }),
  withNotAuthRedirect,
  withRouter
)(AddProperty);