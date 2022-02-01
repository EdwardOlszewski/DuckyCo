import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateReducer,
} from './reducers/userReducers'

import {
  productCreateReducer,
  productDetailsReducer,
  productUpdateReducer,
  productListReducer,
  productDeleteReducer,
} from './reducers/productReducers'

import {
  orderCreateReducer,
  getTotalsReducer,
  orderPayReducer,
  orderDetailsReducer,
  orderChargeReducer,
  orderDeliverReducer,
  orderListReducer,
  orderListMyReducer,
} from './reducers/orderReducers'

import { uploadImageReducer } from './reducers/imageReducers'

import { cartReducer } from './reducers/cartReducers'

import { resetReducer } from './reducers/mainReducers'

const reducer = combineReducers({
  // Users
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  // Products
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  // Image
  imageUpload: uploadImageReducer,
  // Cart
  cart: cartReducer,
  // Orders
  orderCreate: orderCreateReducer,
  orderTotals: getTotalsReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderCharge: orderChargeReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderListMy: orderListMyReducer,
  // Main
  resetState: resetReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

//const devTools = applyMiddleware(...middleware)
const devTools = composeWithDevTools(applyMiddleware(...middleware))

const store = createStore(reducer, initialState, devTools)

export default store
