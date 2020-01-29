import axios from 'axios'

const BLOG_URL = '/api/blog'

export const fetchBlogApi = () =>
  axios.get(BLOG_URL)
    .then(response => ({ response }))
    .catch(error => ({ error }))

export const deleteBlog = id => axios.delete(`${BLOG_URL}/${id}`, {
  headers: {
    'x-auth': localStorage.getItem('token')
  }
})

export const updateBlogOrder = order => axios.patch('/api/blogOrder', { order }, {
  headers: {
    'x-auth': localStorage.getItem('token')
  }
})
