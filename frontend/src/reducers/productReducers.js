import {
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  //
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  //
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_FAIL,
  //
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_FAIL,
  //
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_FAIL,
  //
  PRODUCT_MOSTRECENT_REQUEST,
  PRODUCT_MOSTRECENT_SUCCESS,
  PRODUCT_MOSTRECENT_FAIL,
  //
  PRODUCT_SPECIAL_REQUEST,
  PRODUCT_SPECIAL_SUCCESS,
  PRODUCT_SPECIAL_FAIL,
  //
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  //
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_RESET,
  PRODUCT_DELETE_REVIEW_FAIL,
} from '../types/productTypes'

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, success: false, error: action.payload }
    case PRODUCT_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const productMostRecentReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_MOSTRECENT_REQUEST:
      return { loading: true }
    case PRODUCT_MOSTRECENT_SUCCESS:
      return {
        loading: false,
        success: true,
        recentProducts: action.payload.products,
      }
    case PRODUCT_MOSTRECENT_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}

export const listSpecialProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SPECIAL_REQUEST:
      return { loading: true }
    case PRODUCT_SPECIAL_SUCCESS:
      return {
        loading: false,
        success: true,
        specialProducts: action.payload.products,
      }
    case PRODUCT_SPECIAL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const reviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DELETE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
