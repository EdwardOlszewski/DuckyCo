import {
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_CREATE_RESET,
  //----
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  //----
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  //----
  QUESTION_ANSWERED_REQUEST,
  QUESTION_ANSWERED_SUCCESS,
  QUESTION_ANSWERED_FAIL,
} from '../types/questionTypes'

export const createQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true, success: false }
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case QUESTION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const listQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return { loading: true, success: false }
    case QUESTION_LIST_SUCCESS:
      return { loading: false, success: true, questions: action.payload }
    case QUESTION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const questionDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DETAILS_REQUEST:
      return { loading: true, success: false }
    case QUESTION_DETAILS_SUCCESS:
      return { loading: false, success: true, question: action.payload }
    case QUESTION_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateQuestionToAnsweredReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_ANSWERED_REQUEST:
      return { loading: true, success: false }
    case QUESTION_ANSWERED_SUCCESS:
      return { loading: false, success: true }
    case QUESTION_ANSWERED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
