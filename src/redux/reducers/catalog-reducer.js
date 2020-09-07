import {LIMIT} from "../../constants/constants";

const PRODUCTS_TO_STATE = "PRODUCTS_TO_STATE";
const LIST_PROPS_TO_STATE = "LIST_PROPS_TO_STATE";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const CHANGE_ORDER = "CHANGE_ORDER";
const SET_SEARCH = "SET_SEARCH";

const initialState = {
  items: [],
  props: [],
  settings: {
    arrPages: [],
    lastElId: null,
    totalCount: null,
  },
  currentPage: 1,
  sort: "id",
  order: "asc",
  search: "",
  limit: LIMIT
}

export const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_TO_STATE:
      return {
        ...state,
        items: [...action.items],
        settings: {...action.settings}
      }
    case LIST_PROPS_TO_STATE:
      return {
        ...state,
        props: [...action.props]
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page
      }
    case CHANGE_ORDER:
      return {
        ...state,
        order: action.order
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.search
      }
    default:
      return state
  }
}

export const setProductsToState = (items, settings = {}) => {
  return {
    type: PRODUCTS_TO_STATE,
    items,
    settings
  }
}

export const setListPropsToState = (props) => {
  return {
    type: LIST_PROPS_TO_STATE,
    props
  }
}

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    page
  }
}

export const changeOrder = (order) => {
  return {
    type: CHANGE_ORDER,
    order
  }
}

export const setSearchToState = (search) => {
  return {
    type: SET_SEARCH,
    search
  }
}