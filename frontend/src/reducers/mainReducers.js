import { STORE_RESET } from '../types/mainTypes'

export const resetReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_RESET:
      return {}
    default:
      return state
  }
}
