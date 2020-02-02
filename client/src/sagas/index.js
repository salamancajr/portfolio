import { all } from 'redux-saga/effects'
import projectSagas from './projectSagas'
import blogSagas from './blogSagas'
import authSagas from './authSagas'

export default function * rootSaga () {
  yield all([
    ...authSagas,

    ...projectSagas,
    ...blogSagas
  ])
}
