export const FETCH_PROJECTS = 'FETCH_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'
export const EDIT_PROJECT = 'EDIT_PROJECT'
export const SELECT_PROJECT = 'SELECT_PROJECT'
export const UPDATE_SELECTED_PROJECT = 'UPDATE_SELECTED_PROJECT'
export const UPDATE_PROJECT_ORDER = 'UPDATE_PROJECT_ORDER'
export const PROJECTS_SUCCESS = 'PROJECTS_SUCCESS'

export const FETCH_BLOG = 'FETCH_BLOG'
export const ADD_BLOG = 'ADD_BLOG'
export const EDIT_BLOG = 'EDIT_BLOG'
export const SELECT_BLOG = 'SELECT_BLOG'
export const UPDATE_SELECTED_BLOG = 'UPDATE_SELECTED_BLOG'
export const DELETE_BLOG = 'DELETE_BLOG'
export const UPDATE_BLOG_ORDER = 'UPDATE_BLOG_ORDER'
export const BLOG_SUCCESS = 'BLOG_SUCCESS'
export const LIKE_BLOG = 'LIKE_BLOG'

export const LOGIN_AUTH = 'LOGIN_AUTH'
export const AUTHENTICATE_ROUTE = 'AUTHENTICATE_ROUTE'
export const ADMIN_LOGOUT = 'ADMIN_LOGOUT'
export const UI_START_LOADING = 'UI_START_LOADING'
export const UI_STOP_LOADING = 'UI_STOP_LOADING'
export const API_ERROR = 'API_ERROR'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export const fetchProjects = () => ({ type: FETCH_PROJECTS })
export const selectProject = id => ({ type: SELECT_PROJECT, payload: id })
export const deleteProject = id => ({ type: DELETE_PROJECT, payload: id })
export const addProject = values => ({ type: ADD_PROJECT, payload: values })
export const updateProjectOrder = order => ({ type: UPDATE_PROJECT_ORDER, payload: order })
export const editProject = values => ({ type: EDIT_PROJECT, payload: values })

export const fetchBlog = (cb = () => {}) => ({ type: FETCH_BLOG, payload: cb })
export const selectBlog = id => ({ type: SELECT_BLOG, payload: id })
export const likeBlog = id => ({ type: LIKE_BLOG, payload: id })
export const deleteBlog = id => ({ type: DELETE_BLOG, payload: id })
export const updateBlogOrder = order => ({ type: UPDATE_BLOG_ORDER, payload: order })
export const addBlog = values => ({ type: ADD_BLOG, payload: values })
export const editBlog = values => ({ type: EDIT_BLOG, payload: values })

export const login = (values, cb) => ({ type: LOGIN_AUTH, payload: { values, cb } })
export const authenticateRoute = (cb = () => {}) => ({ type: AUTHENTICATE_ROUTE, payload: cb })
export const adminLogout = () => ({ type: ADMIN_LOGOUT })
