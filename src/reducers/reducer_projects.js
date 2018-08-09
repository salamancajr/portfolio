import {FETCH_PROJECTS, DELETE_PROJECT, UPDATED_PROJECTS} from "../actions";

export default function(state={}, action){

    switch(action.type){
        case FETCH_PROJECTS:
            return action.payload.data;

        case DELETE_PROJECT:
            return action.payload.data;

        case UPDATED_PROJECTS:
        console.log("crappy baby", action.payload.data);

            return action.payload.data;
        default:
        return state;
    }
}

