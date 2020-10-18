import {loginURL} from "../baseURL";

export const userAPI = {
  login: ({email, password}) => {
    return loginURL.post('login', {
      email,
      password
    }).then((response) => {
      return response.data;
    })
  }
}

