import * as axios from 'axios';
import {LIMIT} from "../../constants/constants";
import {generalFunction} from "../generalFunctions/generalFunctions";

const instance = axios.create({
  baseURL: "http://localhost:3333/"
})

export const propertyApi = {
  async getProperties(page = 1, limit = LIMIT, sort, order, search = "") {
    let arResult = [],
      lastElements;
    // Получаем список текущих проперти
    arResult = await this.getList(page, limit, sort, order, search);

    // Разбиваем ссылки на массив
    arResult.headers.link = generalFunction.linkSplitting(arResult.headers.link);

    // Получаем последний элемент массива
    lastElements = await this.getLastElements(arResult.headers.link.lastPage, limit);
    arResult.headers['lastElement'] = generalFunction.arrayLast(lastElements.data);

    return arResult;
  },
  getList(page = 1, limit = LIMIT, sort, order, search = "") {
    if (isNaN(page)) page = 1;
    return instance.get('properties', {
      params: {
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
        q: search
      }
    }).then((response) => {
      return response;
    })
  },
  async addProperty(id, name, type) {
    let props,
      error,
      errorMessage = "";
    await instance.get('properties').then((response) => {
      props = response.data
    });

    props.find((item) => {
      if(item.name.toLowerCase() === name.toLowerCase()) {
        error = true;
        errorMessage = "Нельзя добавить существующее свойство"
      } else {
        error = false;
        errorMessage = ""
      }
    })

    if(!error) {
      return instance.post('properties', {
        id: id + 1,
        name,
        type,
        label: name,
        value: name
      }).then((response) => {
        return response;
      })
    } else {
      return {
        error: error,
        errorMessage: errorMessage
      }
    }

  },
  deleteProperty(id) {
    return instance.delete(`properties/${id}`).then((response) => {
      return response;
    })
  },
  async getLastElements(lastPage = 1, limit) {
    return this.getList(lastPage, limit,"id", "asc", "");
  }
}