import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { FETCH_BLOG, UI_STOP_LOADING, UI_START_LOADING } from '../actions'

const BLOG_URL = '/api/blog'

function fetchBlogApi () {
  return axios.get(BLOG_URL
  ).then(response => ({ response }))
    .catch(error => ({ error }))
}

export function * fetchBlog () {
  yield put({ type: UI_START_LOADING })
  const { response, error } = yield call(fetchBlogApi)
  if (response) {
    yield put({ type: UI_STOP_LOADING })
    yield put({ type: FETCH_BLOG, payload: response })
  } else { yield put({ type: UI_STOP_LOADING }) }
}
