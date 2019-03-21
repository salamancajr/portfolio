import axios from "axios";
import { call, put } from 'redux-saga/effects'
import {FETCH_PROJECTS} from "./actions";
const PROJECTS_URL = "/api/api";

function fetchProjectsApi(cb) {
    const request = axios.get(PROJECTS_URL
    ).then(response=>({response}))
    .catch(error => ({ error }))
} 

export function* fetchProjects(cb) {
    
    const { response, error } = yield call(fetchProjectsApi)
  if (response)
    yield put({ type: FETCH_PROJECTS, payload: response })
  else
    console.log(error);
}