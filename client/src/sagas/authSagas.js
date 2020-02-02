import { call, put, takeEvery, fork } from 'redux-saga/effects'
import api from '../api'
import { AUTHENTICATE_ROUTE, LOGIN_AUTH, ADMIN_LOGOUT, API_ERROR, LOG_OUT, LOG_IN } from '../actions'

function * signOut () {
  const token = yield localStorage.getItem('token')
  const { error } = yield call(api.adminLogout, token)
  if (error) {
    yield put({ type: API_ERROR, payload: error })
  }
  yield put({ type: LOG_OUT })
}

function * watchSignOut () {
  yield takeEvery(ADMIN_LOGOUT, signOut)
}

function * signIn ({ payload }) {
  const response = yield call(api.adminSignIn, payload.values)

  if (response.status === 200) {
    localStorage.setItem('token', response.headers['x-auth'])
    yield put({ type: LOG_IN })
    yield call(payload.cb)
  } else {
    yield put({ type: API_ERROR })
  }
}

function * watchSignIn () {
  yield takeEvery(LOGIN_AUTH, signIn)
}

function * authRoute ({ payload }) {
  yield put({ type: API_ERROR })
  const token = localStorage.getItem('token')
  const { response, error } = yield call(api.authenticateRoute, token)

  if (error) {
    yield call(payload)
    yield put({ type: LOG_OUT })
  } else if (response) {
    yield put({ type: LOG_IN })
  }
}

function * watchAuthenticateRoute () {
  yield takeEvery(AUTHENTICATE_ROUTE, authRoute)
}

const authSagas = [
  fork(watchSignOut),
  fork(watchSignIn),
  fork(watchAuthenticateRoute)
]

export default authSagas
