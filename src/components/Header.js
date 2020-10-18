import React from "react";
import styled from "styled-components"
import {NavLink} from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Navbar>
        <NavLink to={'/all-product'} activeClassName={'active'}>
          <nav>Листинг товаров</nav>
          <Gradient className={'gradient'}/>
        </NavLink>
        <NavLink to={'/all-property'} activeClassName={'active'}>
          <nav>Листинг проперти</nav>
          <Gradient className={'gradient'}/>
        </NavLink>
      </Navbar>
    </header>
  )
}

const Navbar = styled.div`
  display: flex;
  
  a {
    position: relative;
    text-decoration: none;
  }
  
  a.active {
    border-top: 2px solid #0258FF;
    .gradient {
      display: block;
    }
  }
  
  nav {
    width: 255px;
    height: 60px;
    border-top: 2px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 22px;
    color: #0258FF;
  }
`;

const Gradient = styled.div`
  display: none;

  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  
  background: linear-gradient(180deg, #0258FF 0%, rgba(2, 88, 255, 0) 100%);
  opacity: 0.1;
`;

