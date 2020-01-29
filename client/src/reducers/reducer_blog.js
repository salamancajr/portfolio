import { BLOG_SUCCESS } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case BLOG_SUCCESS:
      return action.payload

    default:
      return state
  }
}
