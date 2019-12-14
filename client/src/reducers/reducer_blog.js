import { FETCH_BLOG, DELETE_BLOG, UPDATED_BLOG } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_BLOG:

      return action.payload.data

    case DELETE_BLOG:
      return action.payload.data

    case UPDATED_BLOG:
      return action.payload.data

    default:
      return state
  }
}
