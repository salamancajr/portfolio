import { call, put, takeEvery, fork, select } from 'redux-saga/effects'
import { BLOG_SUCCESS, UPDATE_BLOG_ORDER, FETCH_BLOG, DELETE_BLOG, API_ERROR, UI_STOP_LOADING, UI_START_LOADING, UPDATE_SELECTED_BLOG, SELECT_BLOG } from '../actions'

import api from '../api'

function * fetchBlog ({ cb }) {
  yield put({ type: UI_START_LOADING })
  const { response, error } = yield call(api.fetchBlogApi)
  if (response) {
    if (cb) {
      yield call(cb, response.headers['x-forwarded-for'])
    }
    yield put({ type: UI_STOP_LOADING })
    yield put({ type: BLOG_SUCCESS, payload: response.data })
  }
}

function * watchFetchBlog () {
  yield takeEvery(FETCH_BLOG, fetchBlog)
}

function * selectBlog ({ payload }) {
  const selectedBlog = yield select(({ blog }) => blog.find(({ _id }) => _id === payload))
  yield put({ type: UPDATE_SELECTED_BLOG, payload: selectedBlog })
}

function * watchSelectBlog () {
  yield takeEvery(SELECT_BLOG, selectBlog)
}

function * deleteBlog ({ payload }) {
  const response = yield call(api.deleteBlog, payload)
  if (response.status === 200) {
    yield put({ type: BLOG_SUCCESS, payload: response.data })
  } else {
    yield put({ type: API_ERROR })
  }
}

function * watchDeleteBlog () {
  yield takeEvery(DELETE_BLOG, deleteBlog)
}

function * updateBlogOrder ({ payload }) {
  const response = yield call(api.updateBlogOrder, payload)
  if (response.status === 200) {
    yield put({ type: BLOG_SUCCESS, payload: response.data })
  } else {
    yield put({ type: API_ERROR })
  }
}

function * watchUpdateBlogOrder () {
  yield takeEvery(UPDATE_BLOG_ORDER, updateBlogOrder)
}

const blogSagas = [
  fork(watchFetchBlog),
  fork(watchDeleteBlog),
  fork(watchSelectBlog),
  fork(watchUpdateBlogOrder)
]

export default blogSagas
