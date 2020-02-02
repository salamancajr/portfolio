import axios from 'axios'
const PROJECTS_URL = '/api/projects'

const config = {
  headers: {
    'x-auth': localStorage.getItem('token')
  }
}

export const addProject = values => axios.post('/api/projects', values, config)

export const fetchProjects = () =>
  axios.get(PROJECTS_URL
  ).then(response => ({ response }))
    .catch(error => ({ error }))

export const deleteProject = id => axios.delete(`${PROJECTS_URL}/${id}`, config)

export const updateProjectOrder = order => axios.patch('/api/projectOrder', { order }, config)

export const editProject = values =>
  axios.patch(`${PROJECTS_URL}/${values._id}`, values, config)
