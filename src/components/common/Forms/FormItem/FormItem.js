import React from "react";
import arrayMutators from "final-form-arrays";
import {Field, Form} from "react-final-form";
import {required} from "../../../../utils/validators";
import {AddItem_Input, Properties} from "./Properties/Properties";
import {STextarea} from "../../../Primitives";
import styled from "styled-components";


function FormItem({onSubmit, formID, initialValues}) {
  return(
    <Form
      onSubmit={onSubmit}
      initialValues={{...initialValues}}
      mutators={{...arrayMutators}}
      render={({handleSubmit}) => (
        <AddItemForm onSubmit={handleSubmit} id={formID}>
          <FieldBlock>
            <Label required>Название товара</Label>
            <Field
              name={'name'}
              placeholder={'Название товара'}
              validate={required}
              component={AddItem_Input}
            />
          </FieldBlock>

          <FieldBlock>
            <Label required>Стоимость товара</Label>
            <Field
              name={'price'}
              placeholder={'Стоимость товара'}
              validate={required}
              component={AddItem_Input}
            />
          </FieldBlock>
          <FieldBlock>
            <Label required>Изображение</Label>
            <Field
              name={'image'}
              placeholder={'Ссылка на изображение'}
              validate={required}
              component={AddItem_Input}
            />
          </FieldBlock>

          <Field
            name={'description'}
            placeholder={'Описание'}
            render={({input}) => (
              <FieldBlock>
                <Label>Описание</Label>
                <STextarea {...input} placeholder={'Описание'} rows={8}/>
              </FieldBlock>
            )}
          />

          <Properties/>

        </AddItemForm>
      )}
    />
  )
}

export default FormItem;



const AddItemForm = styled.form`
  width: 540px;
  margin-bottom: 250px;
`;

const FieldBlock = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;


  ${props => props.required ?
  `:after {
    content: '*';
    color: red;
  }` : ``}
`;

const Error = styled.span`
  color: red;
`;

