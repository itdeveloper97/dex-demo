import {userAPI} from "../../api/User/User";
import {cookieAPI} from "../../api/Cookie/Cookie";

const LOGIN = 'LOGIN';
const AUTHORIZED = 'AUTHORIZED';

const initialState = {
  isAuthorized: cookieAPI.getCookie('isAuth') || false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state
      }
    case AUTHORIZED:
      return {
        ...state,
        isAuthorized: action.isAuthorized
      }
    default:
      return state;
  }
}

export const setAuth = (isAuthorized) => ({
  type: AUTHORIZED,
  isAuthorized
})


export const login = (email, password) => (dispatch) => {
  userAPI.login(email, password).then(response => {
    if (response.data.token) {
      cookieAPI.setCookie('isAuth', true);
      if(cookieAPI.getCookie('isAuth')) {
        dispatch(setAuth(true))
      }
    }
  }).catch((error) => {
    alert("Не верный логин или пароль");
  })
}

export const logout = () => (dispatch) => {
  cookieAPI.deleteCookie('isAuth');
  dispatch(setAuth(false));
}