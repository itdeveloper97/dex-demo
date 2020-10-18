import React, {LabelHTMLAttributes, useEffect} from "react";
import styled from 'styled-components';
import {AdminLayout} from "../../layout";
import {SGreenButton, SInput, SRedButton} from "../../Primitives";
import {Field, Form} from "react-final-form";
import {required} from "../../../utils/validators";
import {useAppDispatch} from "../../../redux/store";
import {useHistory} from "react-router";
import {addPropertyThunkCreator} from "../thunk-creators";
import Swal from "sweetalert2";
import {propertyTypes} from "./propertyTypes";


export const AddProperty: React.FC = () => {

  const dispatch = useAppDispatch();
  const history = useHistory();

  function onSubmit({name, type}: {name: string, type: string}): void {
    dispatch(addPropertyThunkCreator({name, type})).then((response: any) => {
     if(!response.error) {
       Swal.fire({
         icon: "success",
         title: 'Товар добавлен',
       }).then(() => goBack())
     }
    })
  }

  const goBack = (): void => history.goBack();

  return (
    <AdminLayout hasHeader={false}>
      <Section className={'AddProperty'}>
        <Buttons>
          <SRedButton type={'button'} onClick={goBack}>Вернуться</SRedButton>
          <SGreenButton type={'submit'} form={'AddPropertyForm'}>Добавить</SGreenButton>
        </Buttons>
        <div className={'title'}>
          <h4>Добавление свойства</h4>
        </div>

        <Form
          onSubmit={onSubmit}
          initialValues={{
            type: 'Dropdown'
          }}
          render={({handleSubmit, values}) => (
            <form onSubmit={handleSubmit} id={'AddPropertyForm'}>
              <Field
                name={'name'}
                validate={required}
                render={({input, meta}) => (
                  <FieldBlock>
                    <Label required>Название свойства</Label>
                    <SInput {...input} type={'text'} placeholder={'Цвет авто'}/>
                    {meta.error && meta.touched && <Error>{meta.error}</Error>}
                  </FieldBlock>
                )}
              />
              <FieldBlock>
                <div>
                  <Label required>Укажите тип свойства</Label>
                </div>
                {propertyTypes.map((item, index) => (
                  <RadioBlock key={index}>
                    <Field
                      id={index}
                      name={'type'}
                      type={'radio'}
                      component={'input'}
                      value={item}
                    />
                    {/*Вопросик*/}
                    <Label htmlFor={String(index)}>{item}</Label>
                  </RadioBlock>
                ))}
              </FieldBlock>
            </form>
          )}
        />
      </Section>
    </AdminLayout>
  )
}

const Section = styled.section`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(40, 40, 40, 0.05);
  border-radius: 10px;
  padding: 0px 95px;
  margin: 25px 0px;
`;

const Buttons = styled.div`
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  & > * {
    margin-left: 30px;
  }
`;

const FieldBlock = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

const RadioBlock = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 8px;
  
  input[type='radio'] {
    margin: 0px 8px 0px 0px;
  }
`;

const Error = styled.span`
  color: red;
`;

const Label = styled.label<{required?: boolean}>`
  font-size: 14px;


  ${props => props.required ?
  `:after {
    content: '*';
    color: red;
  }` : ``}
`;