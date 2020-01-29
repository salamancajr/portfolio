import { call, put, fork, takeEvery, select } from 'redux-saga/effects'
import api from '../api'
import { UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_ORDER, DELETE_PROJECT_SUCCESS, API_ERROR, UPDATE_SELECTED_PROJECT, SELECT_PROJECT, DELETE_PROJECT, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS, UI_STOP_LOADING, UI_START_LOADING, ADD_PROJECT_SUCCESS, ADD_PROJECT_ERROR, ADD_PROJECT } from '../actions'

function * fetchProjects () {
  yield put({ type: UI_START_LOADING })
  const { response, error } = yield call(api.fetchProjects)
  if (response) {
    yield put({ type: FETCH_PROJECTS_SUCCESS, payload: response.data })
    yield put({ type: UI_STOP_LOADING })
  } else { yield put({ type: UI_STOP_LOADING }) }
}

function * watchFetchProjects () {
  yield takeEvery(FETCH_PROJECTS, fetchProjects)
}

function * addProject ({ payload }) {
  const { status, name } = yield call(api.getPresignedURL, payload.img[0])
  if (status === 200) {
    const response = yield call(api.addProject, { ...payload, img: name })
    if (response.status === 200) {
      yield put({ type: ADD_PROJECT_SUCCESS, payload: response.data })
    } else {
      yield put({ type: API_ERROR })
    }
  }
}

function * watchAddProjects () {
  yield takeEvery(ADD_PROJECT, addProject)
}

function * deleteProject ({ payload }) {
  const response = yield call(api.deleteProject, payload)
  if (response.status === 200) {
    yield put({ type: DELETE_PROJECT_SUCCESS, payload: response.data })
  } else {
    yield put({ type: API_ERROR })
  }
}

function * watchDeleteProject () {
  yield takeEvery(DELETE_PROJECT, deleteProject)
}

function * selectProject ({ payload }) {
  const selectedProject = yield select(({ projects }) => projects.find(({ _id }) => _id === payload))
  yield put({ type: UPDATE_SELECTED_PROJECT, payload: selectedProject })
}

function * watchSelectProject () {
  yield takeEvery(SELECT_PROJECT, selectProject)
}

function * updateProjectOrder ({ payload }) {
  const response = yield call(api.updateProjectOrder, payload)
  if (response.status === 200) {
    yield put({ type: UPDATE_PROJECT_SUCCESS, payload: response.data })
  } else {
    yield put({ type: API_ERROR })
  }
}

function * watchUpdateProjectOrder () {
  yield takeEvery(UPDATE_PROJECT_ORDER, updateProjectOrder)
}

const projectSagas = [
  fork(watchFetchProjects),
  fork(watchAddProjects),
  fork(watchDeleteProject),
  fork(watchSelectProject),
  fork(watchUpdateProjectOrder)
]

export default projectSagas
