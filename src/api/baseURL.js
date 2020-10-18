import * as axios from "axios";

export const loginURL = axios.create({
  baseURL: 'https://reqres.in/api/'
})