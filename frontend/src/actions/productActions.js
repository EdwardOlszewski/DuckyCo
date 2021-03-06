import axios from 'axios'
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  //
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  //
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  //
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  //
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
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
  PRODUCT_CREATE_REVIEW_FAIL,
  //
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
} from '../types/productTypes'
import { logout } from './userActions'

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(`/api/products?keyword=${keyword}`)

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listMostRecentProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_MOSTRECENT_REQUEST })

    const { data } = await axios.get(`/api/products/mostrecent`)

    dispatch({
      type: PRODUCT_MOSTRECENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_MOSTRECENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSpecialProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SPECIAL_REQUEST })

    const { data } = await axios.get(`/api/products/special`)

    dispatch({
      type: PRODUCT_SPECIAL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_SPECIAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`/api/products/${productId}/reviews`, review, config)

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const deleteReview = (id, reviewId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}/reviews`, reviewId, config)

    dispatch({
      type: PRODUCT_DELETE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_DELETE_REVIEW_FAIL,
      payload: message,
    })
  }
}
