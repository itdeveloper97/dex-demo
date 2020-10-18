import React, {useEffect} from "react";
import styled from 'styled-components';
import plus from '../../../../../assets/images/plus.svg';
import minus from '../../../../../assets/images/minus.png'
import {FieldArray, useFieldArray} from "react-final-form-arrays";
import {Field, useField, useForm, useFormState} from "react-final-form";
import {required} from "../../../../../utils/validators";
import {SInput} from "../../../../Primitives";
import {CustomSelect} from "../../../CustomSelect";
import {useSelector} from "react-redux";
import {formItemRepeatingProp} from "../validators";


export const Properties = () => {

  const form = useForm();



  const onPushProperty = () => form.mutators.push('properties', {
    property: '',
    value: ''
  })

  return (
    <div>
      <Title>
        <h4>Добавление свойств товару</h4>
        <Plus src={plus} onClick={onPushProperty}/>
      </Title>
      <FieldArray
        name={'properties'}
        validate={formItemRepeatingProp}
        render={({fields, meta}) => (
          <div>
            {
              meta.error && meta.touched && meta.error[0] && <Error>{meta.error[0].property}</Error>
            }
            {
              fields.map((name, index) => (
                <Property key={index} index={index} name={name}/>
              ))
            }
          </div>
        )}
      />
    </div>
  )
}

const Property = ({name, index}) => {

  const form = useForm();
  const fieldArray = useFieldArray('properties');
  const typeProperty = fieldArray.fields.value[index].property.type;

  function onRemoveProperty() {
    fieldArray.fields.remove(index)
  }

  function onPropertyChange(selectValues) {
    form.change(name, {property: selectValues, value: ['']})
  }

  return (
    <PropertyContainer>
      <img src={minus} className={'removeProperty'} onClick={onRemoveProperty}/>
      <FieldBlock>
        <label>Свойство {index + 1}</label>
        <Select name={`${name}.property`} onChange={onPropertyChange}/>
      </FieldBlock>

      {typeProperty && typeProperty !== 'Dropdown' &&
      <FieldBlock>
        <label>Значение</label>
        <Field
          name={`${name}.value`}
          placeholder={'Значение'}
          validate={required}
          component={AddItem_Input}
        />
      </FieldBlock>}

      {typeProperty && typeProperty === 'Dropdown' &&
      <FieldBlock>
        <label>Значение</label>
        <ArrayInput arrayName={`${name}.value`}/>
      </FieldBlock>
      }
    </PropertyContainer>
  )
}

const Select = ({name, onChange}) => {

  const options = useSelector(state => state.property.items)

  return (
    <Field
      name={name}
      render={({input}) => (
        <FieldBlock>
          <CustomSelect
            {...input}
            options={options}
            onChange={onChange}
            placeholder={'Выберите свойство'}
          />
        </FieldBlock>
      )}
    />
  )
}

const ArrayInput = ({arrayName}) => {

  const form = useForm();

  function onPushValue() {
    form.mutators.push(arrayName, '');
  }


  return (
    <div>
      <FieldArray
        name={arrayName}
        render={({fields}) =>
          fields.map((name, index) =>
            <Field
              key={index}
              name={name}
              arrayName={arrayName}
              index={index}
              validate={required}
              placeholder={'Значение'}
              component={AddItem_Input}
            />
          )}
      />
      <Plus src={plus} onClick={onPushValue}/>
    </div>
  )
}

export const AddItem_Input = ({input, meta, placeholder, arrayName, index}) => {

  const fieldArray = useFieldArray(arrayName ? arrayName : '')

  function onDeleteValue() {
    fieldArray.fields.remove(index);
  }

  return (
    <FieldBlock>
      {
        typeof(input.value) === "object"
          ?  <SInput {...input} value={input.value.name} type="text" placeholder={placeholder}/>
          :  <SInput {...input} type="text" placeholder={placeholder}/>
      }
      {index ? <img src={minus} onClick={onDeleteValue} className={'removeValue'}/> : ''}
      {meta.error && meta.touched && <Error>{meta.error}</Error>}
    </FieldBlock>
  )
}


const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
  margin-bottom: 23px;

  h4 {
    margin: 0px;
    margin-right: 36px;
  }
`;

const Plus = styled.img`
  margin-top: 8px;
  cursor: pointer;
  width: 24px;
`;


const Error = styled.span`
  color: red;
`;

const FieldBlock = styled.div`
  width: 255px;
  position: relative;
  
  .removeValue {
    cursor: pointer;
    width: 24px;
    position: absolute;
    right: -54px;
    top: 10px;
  }
`;

const PropertyContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  
  .removeProperty {
    cursor: pointer;
    width: 24px;
    position: absolute;
    left: -52px;
  }
`;