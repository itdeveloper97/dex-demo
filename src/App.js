import React from 'react';
import styled from 'styled-components';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {routes} from "./routes/routes";

function App() {

  return (
    <AppWrapper className="App">
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
    </AppWrapper>
  );
}

export default App;


const AppWrapper = styled.div`
  background: #E5E5E5;
  min-height: 100vh;
  
  font-family: Roboto;
  font-style: normal;
`;