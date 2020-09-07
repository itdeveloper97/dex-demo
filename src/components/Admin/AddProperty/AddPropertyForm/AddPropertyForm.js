import React from "react";
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import s from "./AddPropertyForm.module.css";
import btn from "../../../../assets/commonStyles/Button.module.css";
import {withRouter} from "react-router-dom";
import {Input} from "../../../common/FormControls/FormsControl";
import {required} from "../../../../utils/validators/validators";
import BackBtn from "../../../common/BackBtn/BackBtn";

function AddPropertyForm(props) {

  return (<form onSubmit={props.handleSubmit}>
    <div className={s.btnBlock}>
      <BackBtn/>
      <button className={`${btn.greenBtn} ${s.btn}`}>Сохранить</button>
    </div>

    <div className={s.fieldsBlock}>
      <div className={s.title}>
        <h4>Добавление свойства</h4>
      </div>
      <div className={s.formControl}>
        <label className={s.controlLabel}>Название свойства</label>
        <Field component={Input} type="text" name={'propertyName'} placeholder='Название свойства'
               validate={[required]} className={s.input}/>
      </div>

      <div className={s.typePropsLabel}><label className={s.controlLabel}>Укажите тип свойства</label></div>
      <div className={s.formControl}>

        <div className={s.formСheck}>
          <div className={s.fieldBlock}>
            <Field
              type="radio"
              value="Dropdown"
              component={Input}
              name={`propertyType`}
              validate={[required]}
              id={'1'}
            />
          </div>
          <label htmlFor={'1'} className={s.label}>
            Dropdown
          </label>
        </div>

        <div className={s.formСheck}>
          <div className={s.fieldBlock}>
            <Field
              type="radio"
              value="Number"
              component={Input}
              name={`propertyType`}
              validate={[required]}
              id={'2'}
            />
          </div>
          <label htmlFor={'2'} className={s.label}>
            Number
          </label>
        </div>

        <div className={s.formСheck}>
          <div className={s.fieldBlock}>
            <Field
              type="radio"
              value="String"
              component={Input}
              name={`propertyType`}
              validate={[required]}
              id={'3'}
            />
          </div>
          <label htmlFor={'3'} className={s.label}>
            String
          </label>
        </div>
      </div>

    </div>
  </form>)
}

export default compose(
  reduxForm({
    form: 'addProperty'
  }),
  withRouter
)(AddPropertyForm);