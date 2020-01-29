import { ADD_PROJECT_SUCCESS, DELETE_PROJECT, UPDATED_PROJECTS, FETCH_PROJECTS_SUCCESS, UPDATE_PROJECT_SUCCESS } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_PROJECT_SUCCESS:
      return action.payload
    case FETCH_PROJECTS_SUCCESS:

      return action.payload

    case DELETE_PROJECT:
      return action.payload.data

    case UPDATED_PROJECTS:

      return action.payload.data

    case ADD_PROJECT_SUCCESS:
      return action.payload
    default:
      return state
  }
}
