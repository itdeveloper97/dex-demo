import {catalogApi} from "../../api/Catalog/Catalog";
import {
  changeOrder,
  setCurrentPage,
  setListPropsToState,
  setProductsToState,
  setSearchToState
} from "../reducers/catalog-reducer";
import {propertyApi} from "../../api/Properties/Properties";
import {LIMIT} from "../../constants/constants";
import {generalFunction} from "../../api/generalFunctions/generalFunctions";
import store from "../store";

export const getProductsTC = (page = 1, limit = LIMIT, sort = "id", order = 'asc', search = "") => (dispatch) => {
  catalogApi.getProducts(page, limit, sort, order, search).then((response) => {
    if(response.data.length > 0) {
      dispatch(setProductsToState(response.data, {
        totalCount: Number(response.headers["x-total-count"]),
        lastElId: response.headers.lastElement.id,
        arrPages: generalFunction.getArrPages(Number(response.headers["x-total-count"]), LIMIT)
      }));
    } else {
      dispatch(setProductsToState([], {
        arrPages: [],
        lastElId: null,
        totalCount: null,
      }))
    }
  })
}

export const addProductTC = (product) => (dispatch) => {
  let id = store.getState().catalog.settings.lastElId;
  return catalogApi.addProduct(id ,product).then((response) => {
    if(response.status === 201) {
      dispatch(getProductsTC);
    }
    return response;
  })
}

export const getPageTc = (page) => (dispatch) => {
  let catalog = store.getState().catalog;

  dispatch(setCurrentPage(page));

  dispatch(getProductsTC(page, catalog.limit, catalog.sort, catalog.order, catalog.search))
}

export const getAllPropsTC = () => (dispatch) => {
  propertyApi.getList(1, "").then((response) => {
    dispatch(setListPropsToState(response.data));
  })
}

export const changeOrderTC = () => (dispatch) => {
  let catalog = store.getState().catalog,
      order = (store.getState().catalog.order === "asc")
    ? "desc" : "asc";

  dispatch(changeOrder(order));
  dispatch(getProductsTC(catalog.currentPage, catalog.limit, catalog.sort, order, catalog.search))
}

export const deleteProductTC = (id) => (dispatch) => {
  let catalog = store.getState().catalog;
  return catalogApi.deleteProduct(id).then((response) => {
    dispatch(getProductsTC(catalog.currentPage, catalog.limit, catalog.sort, catalog.order, catalog.search))
    return response;
  })
}

export const searchProducts = (search) => (dispatch) => {
  let catalog = store.getState().catalog;

  dispatch(setSearchToState(search));

  dispatch(getProductsTC(catalog.currentPage, catalog.limit, catalog.sort, catalog.order, search))
}

export const getProductTC = (id) => (dispatch) => {
  return catalogApi.getProduct(id).then((response) => {
    return response;
  })
}

export const editProductTC = (id, product) => (dispatch) => {
  return catalogApi.editProduct(id, product).then((response) => {
    return response;
  })
}