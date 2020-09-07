import store from "../store";
import {LIMIT} from "../../constants/constants";
import {propertyApi} from "../../api/Properties/Properties";
import {changeSortPropsItem, sendSearch, setPropertiesToState} from "../reducers/property-reducer";

export const getPropertiesTC = (page = 1) => (dispatch) => {

  let currentPage = store.getState().property.currentPage,
    order = store.getState().property.order,
    sort = store.getState().property.sort,
    search = store.getState().property.search;

  propertyApi.getProperties(page, LIMIT, sort, order, search).then((response) => {
    if (response.status === 200 && response.data.length > 0) {
      let items = response.data, // массив свойств
        lastPage = response.headers.link.lastPage, // получает последнюю страницу
        totalCount = Number(response.headers['x-total-count']), // получает общее количество элементов
        pagesCount = Math.ceil(totalCount / LIMIT), // Получает количество страниц
        arrPages = [],
        lastElId = response.headers.lastElement.id; // получает id последнего элемента

      for (let i = 1; i <= pagesCount; i++) {
        arrPages.push(i)
      }

      dispatch(setPropertiesToState(items, lastElId, lastPage, totalCount, arrPages, page, order));
    } else {
      dispatch(setPropertiesToState([], 0, 1, 0, [], 1, order));
    }
  });
}

export const getPropertiesBySearchTC = (search) => (dispatch) => {
  dispatch(sendSearch(1, search));
  dispatch(getPropertiesTC());
}

export const changeSortPropsItemTC = (sort, order) => (dispatch) => {
  order = (order === 'asc') ? 'desc' : 'asc';

  dispatch(changeSortPropsItem(sort, order));

  let currentPage = store.getState().property.currentPage;


  dispatch(getPropertiesTC(currentPage, LIMIT, sort, order));
}


export const deletePropertyTC = (id, currentPage = 1) => (dispatch) => {
  return propertyApi.deleteProperty(id).then((response) => {
    dispatch(getPropertiesTC(currentPage));
    return response;
  })
}

export const addPropertyTC = (id, name, type) => (dispatch) => {
  return propertyApi.addProperty(id, name, type);
}