import {EDIT_NAME} from "../actions"

export default function(state={}, action){
    switch(action.type){
        case EDIT_NAME:
            return action.payload;

        default:
            return state


    }
}
