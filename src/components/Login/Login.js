import React from "react";
import styled from 'styled-components';
import {SInput, SYellowButton} from "../Primitives";
import {Field, Form} from "react-final-form";
import {required} from "../../utils/validators";
import {GeneralLayout} from "../layout";
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {authThunkCreator} from "./thunk-creators";

export const Login = () => {

  const dispatch = useDispatch();

  function onSubmit(values) {
    dispatch(authThunkCreator(values))
      .then(unwrapResult)
      .catch(() => {
        alert('Не верный логин или пароль')
      })
  }

  return (
    <GeneralLayout>
      <LoginSection>
        <Container>
          <Title>
            <H1>Вход</H1>
          </Title>
          <Form
            onSubmit={onSubmit}
            render={({handleSubmit, values}) => (
              <LoginForm onSubmit={handleSubmit}>
                <Field
                  name={'email'}
                  validate={required}
                  render={({input, meta}) => (
                    <FieldBlock>
                      <Label>Email</Label>
                      <Input {...input} type={'text'}/>
                      {meta.error && meta.touched && <Error>{meta.error}</Error>}
                    </FieldBlock>
                  )}
                />
                <Field
                  name={'password'}
                  validate={required}
                  render={({input, meta}) => (
                    <FieldBlock>
                      <Label>Пароль</Label>
                      <Input {...input} type={'password'}/>
                      {meta.error && meta.touched && <Error>{meta.error}</Error>}
                    </FieldBlock>
                  )}
                />

                <Buttons>
                  <SYellowButton type={'submit'}>Войти</SYellowButton>
                </Buttons>
              </LoginForm>
            )}
          />
        </Container>
      </LoginSection>
    </GeneralLayout>
  )
}

const Container = styled.div`
  width: 350px;
  min-height: 336px;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(40, 40, 40, 0.05);
  border-radius: 10px;
  padding: 0px 16px;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
`;

const LoginSection = styled.section`
  flex-grow: 1;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  flex: 1 0 auto;
  margin-bottom: 16px;
  margin-top: 10px;
  
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  margin: 24px 0px;
  font-weight: 300;
  font-size: 22px;
  color: #000000;
  text-align: center;
`;

const FieldBlock = styled.div`
  flex: 0 0 auto;
  margin-top: 8px;
`;

const Input = styled(SInput)`
  width: 100%;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #828282;
`;

const Error = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: red;
`;

const Buttons = styled.div`
  flex: 1 0 auto;
  
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;