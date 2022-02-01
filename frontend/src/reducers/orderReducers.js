import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_CREATE_FAIL,
  //
  ORDER_TOTALS_REQUEST,
  ORDER_TOTALS_SUCCESS,
  ORDER_TOTALS_RESET,
  ORDER_TOTALS_FAIL,
  //
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_FAIL,
  //
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_PAY_FAIL,
  //
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_FAIL,
  //
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  //
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_FAIL,
  //
  ORDER_CHARGE_REQUEST,
  ORDER_CHARGE_SUCCESS,
  ORDER_CHARGE_RESET,
  ORDER_CHARGE_FAIL,
} from '../types/orderTypes'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const getTotalsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_TOTALS_REQUEST:
      return {
        loading: true,
      }
    case ORDER_TOTALS_SUCCESS:
      return {
        loading: false,
        success: true,
        totals: action.payload,
      }
    case ORDER_TOTALS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_TOTALS_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        success: true,
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const orderChargeReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CHARGE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CHARGE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_CHARGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CHARGE_RESET:
      return {}
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return {}
    default:
      return state
  }
}

export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return {}
    default:
      return state
  }
}
