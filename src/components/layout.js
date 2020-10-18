import React from "react";
import {Header} from "./Header";
import styled from "styled-components";
import {PrivateRoute} from "./common/PrivateRoute";

export const AdminLayout = ({children, hasHeader}) => {
  return (
    <PrivateRoute>
      <SMainContainer className={'SMainContainer'}>
        {hasHeader && <Header/>}
        <main>{children}</main>
      </SMainContainer>
    </PrivateRoute>
  )
}

export const GeneralLayout = ({children}) => {
  return (
    <SMainContainer className={'SMainContainer'}>
      <main>{children}</main>
    </SMainContainer>
  )
}


const SMainContainer = styled.div`
  width: 1100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: auto;
    
  header {
    flex: 0 0 auto;
  }
  main { 
    display: flex;
    flex: 1 0 auto;
    margin-bottom: 20px;
  }
  footer {
    flex: 0 0 auto;
  }
`;