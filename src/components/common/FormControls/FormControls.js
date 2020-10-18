import React from "react";
import styled from "styled-components";

const FormControl = ({ input, meta, ...props }) => {

  const hasError = meta.touched && meta.error;

  return (
      <FieldBlock>
        {props.children}
        {hasError && <span className={'error'}>{meta.error}</span>}
      </FieldBlock>
  )
}

export const Input = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;

  .error {
    color: red;
  }
`;