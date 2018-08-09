import {ADMIN_CHART} from "../actions";

export default function (state="projects", action){
    switch(action.type){
        case ADMIN_CHART:
            return action.payload;

        default:
            return state;
    }
}