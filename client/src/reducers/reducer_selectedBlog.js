import { SELECTED_BLOG } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case SELECTED_BLOG:
      return action.payload.data

    default:
      return state
  }
}
