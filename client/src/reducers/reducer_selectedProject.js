import {SELECTED_PROJECT} from "../actions";

export default function(state={}, action){
    switch(action.type){
        case SELECTED_PROJECT:
            return action.payload.data
        default:
            return state
    }
}