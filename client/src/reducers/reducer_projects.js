import { PROJECTS_SUCCESS } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case PROJECTS_SUCCESS:
      return action.payload
    default:
      return state
  }
}
