import axios from 'axios'
export const FETCH_PROJECTS = 'FETCH_PROJECTS'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const ADD_PROJECT = 'ADD_PROJECT'
export const FETCH_BLOG = 'FETCH_BLOG'
export const FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS'
export const SELECT_BLOG = 'SELECT_BLOG'
export const SELECT_PROJECT = 'SELECT_PROJECT'
export const UPDATE_SELECTED_PROJECT = 'UPDATE_SELECTED_PROJECT'
export const UPDATE_SELECTED_BLOG = 'UPDATE_SELECTED_BLOG'
export const DELETE_BLOG = 'DELETE_BLOG'
export const ADMIN_CHART = 'ADMIN_CHART'
export const ADD_BLOG = 'ADD_BLOG'
export const EDIT_NAME = 'EDIT_NAME'
export const UPDATED_BLOG = 'UPDATED_BLOG'
export const UPDATED_PROJECTS = 'UPDATED_PROJECTS'
export const LOGIN_AUTH = 'LOGIN_AUTH'
export const AUTHENTICATE_ROUTE = 'AUTHENTICATE_ROUTE'
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT'
export const UI_START_LOADING = 'UI_START_LOADING'
export const UI_STOP_LOADING = 'UI_STOP_LOADING'
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS'
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR'
export const API_ERROR = 'API_ERROR'
export const UPDATE_PROJECT_ORDER = 'UPDATE_PROJECT_ORDER'
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS'
export const UPDATE_BLOG_ORDER = 'UPDATE_BLOG_ORDER'
export const BLOG_SUCCESS = 'BLOG_SUCCESS'

const PROJECTS_URL = '/api/projects'
const BLOG_URL = '/api/blog'
const LOGIN_URL = '/api/signin'
const AUTHENTICATE_URL = '/api/authenticate'
const SIGN_OUT = '/api/token'

export const fetchProjects = () => ({ type: FETCH_PROJECTS })

export const selectProject = id => ({ type: SELECT_PROJECT, payload: id })

export const deleteProject = id => ({ type: DELETE_PROJECT, payload: id })

export const addProject = values => ({ type: ADD_PROJECT, payload: values })

export const updateProjectOrder = order => ({ type: UPDATE_PROJECT_ORDER, payload: order })

export const fetchBlog = (cb = () => {}) => ({ type: FETCH_BLOG, payload: cb })

export const selectBlog = id => ({ type: SELECT_BLOG, payload: id })

export const deleteBlog = id => ({ type: DELETE_BLOG, payload: id })

export const updateBlogOrder = order => ({ type: UPDATE_BLOG_ORDER, payload: order })

export const addBlog = (callback) => {
  var form = document.getElementById('blogform')
  var bodyFormData = new FormData(form)

  const request = axios.post(BLOG_URL, bodyFormData, {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  }).then(() => {
    callback()
  })

  return {
    type: ADD_BLOG,
    payload: request
  }
}

export const patchBlogOrProject = async values => {
  const { img } = values

  const { url, name } = await fetch(`/api/presignedRequest/${img.name.replace(/ /g, '_')}&${encodeURIComponent(img.type)}`, {
    method: 'GET',
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  }).then(res => res.json())

  const status = await fetch(url, {
    method: 'PUT',
    body: values.img
  }).then(res => res.status)

  let PATCH_URL
  let type

  if (Object.keys(values).includes('githubLink')) {
    PATCH_URL = PROJECTS_URL
    type = UPDATED_PROJECTS
  } else {
    PATCH_URL = BLOG_URL
    type = UPDATED_BLOG
  }

  if (status === 200) {
    const requestBlog = axios.patch(`${PATCH_URL}/${values._id}`, { ...values, img: name }, {
      headers: {
        'x-auth': localStorage.getItem('token')
      }
    })

    return {
      type,
      payload: requestBlog
    }
  }
}

export function patchItem (target, ip, cb) {
  if (target.id === 'blogForm' || target.id === 'projectsForm') {
    var form = document.getElementById(target.id)
    var bodyFormData = new FormData(form)
    var key = []
    for (var pair of bodyFormData.entries()) {
      key.push(pair[1])
    }
    var body = {
      [key[0]]: key[1]
    }
    if (target.id === 'blogForm') {

    } else {
      const requestProjects = axios.patch(`${PROJECTS_URL}/${target.name}`, body, {
        headers: {
          'x-auth': localStorage.getItem('token')
        }
      })

      return {
        type: UPDATED_PROJECTS,
        payload: requestProjects
      }
    }
  } else {
    const request = axios.patch(`${BLOG_URL}/${target.id}`, {
      likes: target.id,
      ipAddress: ip
    })
    return {
      type: UPDATED_BLOG,
      payload: request
    }
  }
}

export function loginAuth (cb) {
  var form = document.getElementById('loginForm')

  var bodyFormData = new FormData(form)
  var entries = []
  for (var pair of bodyFormData.entries()) {
    entries.push(pair[1])
  }

  const request = axios.post(LOGIN_URL, {
    email: entries[0],
    password: entries[1]
  })
    .then((data) => {
      return localStorage.setItem('token', data.headers['x-auth'])
    }).then(() => {
      cb()
    })

  return {
    type: LOGIN_AUTH,
    payload: request
  }
}

export function authenticateRoute (cb) {
  const request = axios.get(AUTHENTICATE_URL, {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  }).then((data) => {
  }, (data) => {
    cb()
  })
  return {
    type: AUTHENTICATE_ROUTE,
    payload: request
  }
}

export function adminLogout (cb) {
  axios.delete(SIGN_OUT, {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  }).then(() => {
    cb()
    localStorage.removeItem('token')
  })

  return {
    type: ADMIN_LOGOUT,
    payload: 'logged out'
  }
}
