import {LIMIT} from "../../constants/constants";

const SET_PROPERTY = "SET_PROPERTY";
const CHANGE_SORT = "CHANGE_SORT";
const SEND_SEARCH = "SEND_SEARCH";

let initialState = {
  items: [],
  currentPage: 1,
  limit: LIMIT,
  totalCount: 1,
  lastElId: 0,
  lastPage: 1,
  arrPages: [],
  order: 'asc',
  sort: 'name',
  search: ''
};


export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPERTY:
      return {
        ...state,
        items: [...action.items],
        lastElId: action.lastElId,
        lastPage: action.lastPage,
        totalCount: action.totalCount,
        currentPage: action.currentPage,
        arrPages: [...action.arrPages],
        order: action.order
      }
    case CHANGE_SORT:
      return {
        ...state,
        sort: action.sort,
        order: action.order
      }
    case SEND_SEARCH:
      return {
        ...state,
        search: action.search,
        currentPage: action.page
      }
    default:
      return state
  }
}


/*
  action-creators
 */
export const setPropertiesToState = (items, lastElId, lastPage, totalCount, arrPages, currentPage, order) => ({
  type: SET_PROPERTY,
  items,
  lastElId,
  lastPage,
  totalCount,
  arrPages,
  currentPage,
  order
});

export const changeSortPropsItem = (sort, order) => ({
  type: CHANGE_SORT,
  sort,
  order
})

export const sendSearch = (page, search) => ({
  type: SEND_SEARCH,
  search,
  page
})