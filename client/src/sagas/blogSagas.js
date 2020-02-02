import { call, put, takeEvery, fork, select } from 'redux-saga/effects'
import { ADD_BLOG, EDIT_BLOG, LIKE_BLOG, BLOG_SUCCESS, UPDATE_BLOG_ORDER, FETCH_BLOG, DELETE_BLOG, API_ERROR, UI_STOP_LOADING, UI_START_LOADING, UPDATE_SELECTED_BLOG, SELECT_BLOG } from '../actions'
import ipAddress from '../utils/ipAddress'
import api from '../api'

function * fetchBlog () {
  yield put({ type: UI_START_LOADING })
  const { response/*, error */ } = yield call(api.fetchBlogApi)
  if (response) {
    ipAddress.ipAddress = response.headers['x-forwarded-for']

    yield put({ type: UI_STOP_LOADING })
    yield put({ type: BLOG_SUCCESS, payload: response.data })
  }

  if (/SelectedBlog/.test(window.location.pathname)) {
    yield call(selectBlog, { payload: window.location.pathname.split('/')[2] })
  }
}

function * watchFetchBlog () {
  yield takeEvery(FETCH_BLOG, fetchBlog)
}

function * addBlog ({ payload }) {
  const { status, name } = yield call(api.getPresignedURL, payload.img[0])
  if (status === 200) {
    const response = yield call(api.addBlog, { ...payload, img: name })
    if (response.status === 200) {
      yield put({ type: BLOG_SUCCESS, payload: response.data })
    } else {
      yield put({ type: API_ERROR })
    }
  }
}

function * watchAddBlog () {
  yield takeEvery(ADD_BLOG, addBlog)
}

function * editBlog ({ payload }) {
  const { status, name } = yield call(api.getPresignedURL, payload.img[0])
  if (status === 200) {
    const response = yield call(api.editBlog, { ...payload, img: name })
    if (response.status === 200) {
      yield put({ type: BLOG_SUCCESS, payload: response.data })
    } else {
      yield put({ type: API_ERROR })
    }
  }
}

function * watchEditBlog () {
  yield takeEvery(EDIT_BLOG, editBlog)
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

function * likeBlog ({ payload }) {
  const response = yield call(api.likeBlog, payload)
  if (response.status === 200) {
    yield put({ type: BLOG_SUCCESS, payload: response.data })
  } else {
    yield put({ type: API_ERROR })
  }
}

function * watchLikeBlog () {
  yield takeEvery(LIKE_BLOG, likeBlog)
}

const blogSagas = [
  fork(watchEditBlog),
  fork(watchAddBlog),
  fork(watchLikeBlog),
  fork(watchFetchBlog),
  fork(watchDeleteBlog),
  fork(watchSelectBlog),
  fork(watchUpdateBlogOrder)
]

export default blogSagas
