import axios from 'axios'

const BLOG_URL = '/api/blog'

const config = {
  headers: {
    'x-auth': localStorage.getItem('token')
  }
}

export const fetchBlogApi = () =>
  axios.get(BLOG_URL)
    .then(response => ({ response }))
    .catch(error => ({ error }))

export const deleteBlog = id =>
  axios.delete(`${BLOG_URL}/${id}`, config)

export const updateBlogOrder = order =>
  axios.patch('/api/blogOrder', { order }, config)

export const likeBlog = id =>
  axios.patch(`/api/likeBlog/${id}`)

export const addBlog = values =>
  axios.post(BLOG_URL, values, config)

export const editBlog = values =>
  axios.patch(`${BLOG_URL}/${values._id}`, values, config)
