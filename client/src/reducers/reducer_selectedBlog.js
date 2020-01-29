import { UPDATE_SELECTED_BLOG } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_SELECTED_BLOG:
      return action.payload

    default:
      return state
  }
}
