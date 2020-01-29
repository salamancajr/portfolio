import axios from 'axios'
const PROJECTS_URL = '/api/projects'

export const addProject = values => axios.post('/api/projects', values, {
  headers: {
    'x-auth': localStorage.getItem('token')
  }
})

export const fetchProjects = () =>
  axios.get(PROJECTS_URL
  ).then(response => ({ response }))
    .catch(error => ({ error }))

export const deleteProject = id => axios.delete(`${PROJECTS_URL}/${id}`, {
  headers: {
    'x-auth': localStorage.getItem('token')
  }
})

export const updateProjectOrder = order => axios.patch('/api/projectOrder', { order }, {
  headers: {
    'x-auth': localStorage.getItem('token')
  }
})
