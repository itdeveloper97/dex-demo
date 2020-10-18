import React, {useEffect} from "react";
import {AdminLayout} from "../../layout";
import styled from "styled-components";
import {SGreenButton, SRedButton} from "../../Primitives";
import FormItem from "../../common/Forms/FormItem/FormItem";
import {useHistory, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {editProductActionCreator} from "../product-reducer";
import * as Swal from "sweetalert2";


export const EditProduct = () => {

  const dispatch = useDispatch();
  const {productID} = useParams();
  const item = useSelector(state => state.product.items.find(item => item.id === productID))

  const history = useHistory();

  function onSubmit(values) {
    dispatch(editProductActionCreator(values))
    goBack();
    Swal.fire({
      icon: "success",
      title: "Товар изменен"
    })
  }

  const goBack = () => history.goBack();

  return (
    <AdminLayout>
      <Section>
        <Buttons>
          <SRedButton type={'button'} onClick={goBack}>Вернуться</SRedButton>
          <SGreenButton type={'submit'} form={'EditItemForm'}>Изменить</SGreenButton>
        </Buttons>

        <div className={'title'}>
          <h4>Редактирование товара</h4>
        </div>

        <FormItem
          onSubmit={onSubmit}
          formID={'EditItemForm'}
          initialValues={item}
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

