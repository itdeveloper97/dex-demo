import {createStore, combineReducers, applyMiddleware} from "redux";
import { reducer as formReducer } from "redux-form";
import {authReducer} from "./reducers/auth-reducers";
import thunk from "redux-thunk";
import {propertyReducer} from "./reducers/property-reducer";
import {catalogReducer} from "./reducers/catalog-reducer";

let reducers = combineReducers({
    auth: authReducer,
    property: propertyReducer,
    catalog: catalogReducer,
    form: formReducer,
});


let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;


export default store;