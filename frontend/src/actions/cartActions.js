import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_BILLING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_STICKER,
  CART_REMOVE_STICKER,
} from '../types/cartTypes'

export const addToCart = (id, qty, size) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      qty: qty,
      size: size,
      category: data.category,
    },
  })

  if (data.category == 'MISC') {
    dispatch({
      type: CART_ADD_STICKER,
      payload: {
        rdyToCheckout: true,
      },
    })

    localStorage.setItem('rdyToCheckout', JSON.stringify(true))
  }
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  if (id == '62ca4506f38236e60cb3b2c1') {
    dispatch({
      type: CART_REMOVE_STICKER,
      payload: {
        rdyToCheckout: false,
      },
    })
    localStorage.setItem('rdyToCheckout', JSON.stringify(false))
  }
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const saveBillingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_BILLING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('billingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
