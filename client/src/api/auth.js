import axios from 'axios'

const AUTHENTICATE_URL = '/api/auth'

const config = (token) => ({
  headers: {
    'x-auth': token
  }
})

export const adminSignIn = values =>
  axios.post(`${AUTHENTICATE_URL}/signin`, values)

export const authenticateRoute = token => {
  return axios.post(`${AUTHENTICATE_URL}/authenticateRoute`, {}, config(token))
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
export const adminLogout = token =>
  axios.delete(`${AUTHENTICATE_URL}/signout`, {}, config(token))
    .then(response => ({ response }))
    .catch(error => ({ error }))
