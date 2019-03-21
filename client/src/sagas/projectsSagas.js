import axios from "axios";
import { call, put } from "redux-saga/effects";
import {FETCH_PROJECTS, UI_STOP_LOADING, UI_START_LOADING} from "../actions";

const PROJECTS_URL = "/api/api";

function fetchProjectsApi() {
    return axios.get(PROJECTS_URL
    ).then(response=>({response}))
    .catch(error => ({ error }))
}

export function* fetchProjects() {

  yield put({type:UI_START_LOADING})
  const { response, error } = yield call(fetchProjectsApi)
    if (response){

      yield put({ type: FETCH_PROJECTS, payload: response })
      yield put({type:UI_STOP_LOADING})
    }

    else
      yield put({type:UI_STOP_LOADING})
      console.log(error);
}