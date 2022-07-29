import axios from 'axios'
import {
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  //---
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  //---
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  //---
  QUESTION_ANSWERED_REQUEST,
  QUESTION_ANSWERED_SUCCESS,
  QUESTION_ANSWERED_FAIL,
} from '../types/questionTypes'
import { logout } from './userActions'

export const createQuestionAction =
  (firstName, lastName, email, message) => async (dispatch) => {
    try {
      dispatch({
        type: QUESTION_CREATE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/questions',
        { firstName, lastName, email, message },
        config
      )

      dispatch({
        type: QUESTION_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: QUESTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/questions`, config)

    dispatch({
      type: QUESTION_LIST_SUCCESS,
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
      type: QUESTION_LIST_FAIL,
      payload: message,
    })
  }
}

export const getQuestionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/questions/${id}`, config)

    dispatch({
      type: QUESTION_DETAILS_SUCCESS,
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
      type: QUESTION_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateQuestionToAnswered =
  (question) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_ANSWERED_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/questions/${question._id}/answered`,
        {},
        config
      )

      dispatch({
        type: QUESTION_ANSWERED_SUCCESS,
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
        type: QUESTION_ANSWERED_FAIL,
        payload: message,
      })
    }
  }
