import { UPDATE_SELECTED_PROJECT } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_SELECTED_PROJECT:
      return action.payload
    default:
      return state
  }
}
