import React, {Suspense} from 'react';
import s from './App.module.css';
import Login from "./components/Login/Login";
import {Route} from "react-router-dom";

const Admin = React.lazy(() => import('./components/Admin/Admin'));
const AddItem = React.lazy(() => import('./components/Admin/AddItem/AddItem'));
const AddProperty = React.lazy(() => import('./components/Admin/AddProperty/AddProperty'));
const ItemCard = React.lazy(() => import('./components/Admin/ItemCard/ItemCard'));

function App(props) {
  return (
    <div className={s.App}>

      <header className={s.AppHeader}></header>


      <div className={s.container}>
        <Route path={'/'} render={() => <Login/>}/>
        <Route path={'/admin/'} render={() => <Suspense fallback={<div>Loading...</div>}><Admin/></Suspense>}/>
        <Route path={`/add-item/:productID?`} render={() => <Suspense fallback={"Loading..."}><AddItem/></Suspense>}/>
        <Route path={`/add-property/`} render={() => <Suspense fallback={"Loading..."}><AddProperty/></Suspense>}/>
        <Route path={`/item-card/:productID`} render={() => <Suspense fallback={"Loading..."}><ItemCard/></Suspense>}/>
      </div>

      <footer className={s.AppFooter}></footer>

    </div>
  );
}

export default App;
