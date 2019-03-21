import axios from "axios";
import { call, put, take, select, fork, all } from 'redux-saga/effects'
import {FETCH_PROJECTS, FETCH_BLOG} from "./actions";
const PROJECTS_URL = "/api/api";
const BLOG_URL = "/api/blog";

function fetchProjectsApi() {
    return axios.get(PROJECTS_URL
    ).then(response=>({response}))
    .catch(error => ({ error }))
}

export function* fetchProjects() {


  const { response, error } = yield call(fetchProjectsApi)
    if (response){
      yield put({ type: FETCH_PROJECTS, payload: response })
    }

    else
      console.log(error);
}

function fetchBlogApi() {
  return axios.get(BLOG_URL
      ).then(response=>({response}))
      .catch(error=>({error}));
}

export function* fetchBlog() {
  const { response, error } = yield call(fetchBlogApi)
  if (response){
    yield put({ type: FETCH_BLOG, payload: response})
  }
  else
    console.log(error);

}