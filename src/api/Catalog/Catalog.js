import * as axios from "axios";
import {LIMIT} from "../../constants/constants";
import {generalFunction} from "../generalFunctions/generalFunctions";

const instance = axios.create({
  baseURL: "http://localhost:3333/"
})

export const catalogApi = {
  async getProducts(page = 1, limit = LIMIT, sort = "id", order = 'asc', search = "") {
    let arResult,
      linkSplitting = "",
      lastElements;
    arResult = await this.getList(page, limit, sort, order, search)

    if(arResult.headers.link) {
      linkSplitting = generalFunction.linkSplitting(arResult.headers.link);
    }

    // Получаем последний элемент массива
    lastElements = await this.getLastElements(linkSplitting.lastPage, limit);
    arResult.headers['lastElement'] = generalFunction.arrayLast(lastElements.data);

    return arResult;
  },
  getList(page = 1, limit = LIMIT, sort = "id", order = "asc", search = "") {
    return instance.get('products', {
      params: {
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
        q: search
      }
    }).then((response) => {
      return response
    })
  },
  deleteProduct(id) {
    return instance.delete(`products/${id}`).then((response) => {
      return response;
    })
  },
  getProduct(id) {
    return instance.get(`products/${id}`).then((response) => {
      return response;
    })
  },
  editProduct(id, product) {
    return instance.patch(`products/${id}`, {
      ...product
    })
  },
  getLastElements(lastPage = 1, limit) {
    return this.getList(lastPage, limit,"id", "asc", "");
  },
  addProduct(id, product) {
    return instance.post('products', {
      id: id + 1,
      ...product
    }).then((response) => {
      return response
    })
  }
}