import React from "react";
import {AdminLayout} from "../../layout";
import styled from "styled-components";
import {SGreenButton, SRedButton} from "../../Primitives";
import FormItem from "../../common/Forms/FormItem/FormItem";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {addProductActionCreator} from "../product-reducer";
import * as Swal from "sweetalert2";


export const AddProduct = () => {

  const dispatch = useDispatch();

  const history = useHistory();

  function onSubmit(values) {
    dispatch(addProductActionCreator(values))
    history.push('all-product')
    Swal.fire({
      icon: "success",
      title: "Товар добавлен"
    })
  }

  const goBack = () => history.goBack();

  return (
    <AdminLayout>
      <Section>
        <Buttons>
          <SRedButton type={'button'} onClick={goBack}>Вернуться</SRedButton>
          <SGreenButton type={'submit'} form={'AddItemForm'}>Добавить</SGreenButton>
        </Buttons>

        <div className={'title'}>
          <h4>Добавление товара</h4>
        </div>
        <FormItem onSubmit={onSubmit} formID={'AddItemForm'}/>

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

