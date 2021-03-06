import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/userReducers'

import {
  productCreateReducer,
  productDetailsReducer,
  productUpdateReducer,
  productListReducer,
  productDeleteReducer,
  productMostRecentReducer,
  listSpecialProductsReducer,
  productReviewCreateReducer,
  reviewDeleteReducer,
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
  orderShippingReducer,
} from './reducers/orderReducers'

import { uploadImageReducer } from './reducers/imageReducers'

import { cartReducer } from './reducers/cartReducers'

import {
  createQuestionReducer,
  listQuestionReducer,
  questionDetailsReducer,
  updateQuestionToAnsweredReducer,
} from './reducers/questionReducers'

const reducer = combineReducers({
  // Users
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  // Products
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productMostRecent: productMostRecentReducer,
  productSpecial: listSpecialProductsReducer,
  productReviewCreate: productReviewCreateReducer,
  productReviewDelete: reviewDeleteReducer,
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
  shippingUpdate: orderShippingReducer,
  // Questions
  createQuestion: createQuestionReducer,
  questionsList: listQuestionReducer,
  questionDetails: questionDetailsReducer,
  questionAnswered: updateQuestionToAnsweredReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const rdyToCheckoutFromStorage = localStorage.getItem('rdyToCheckout')
  ? JSON.parse(localStorage.getItem('rdyToCheckout'))
  : {}

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    rdyToCheckout: rdyToCheckoutFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

//const devTools = applyMiddleware(...middleware)
const devTools = composeWithDevTools(applyMiddleware(...middleware))

const store = createStore(reducer, initialState, devTools)

export default store
