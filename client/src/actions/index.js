import axios from 'axios'
export const FETCH_PROJECTS = 'fetch_projects'
export const DELETE_PROJECT = 'delete_project'
export const ADD_PROJECT = 'add_project'
export const FETCH_BLOG = 'fetch_blog'
export const SELECTED_BLOG = 'selected_blog'
export const SELECTED_PROJECT = 'selected_project'
export const DELETE_BLOG = 'delete_blog'
export const ADMIN_CHART = 'admin_chart'
export const ADD_BLOG = 'add_blog'
export const EDIT_NAME = 'edit_name'
export const UPDATED_BLOG = 'updated_blog'
export const UPDATED_PROJECTS = 'updated_projects'
export const LOGIN_AUTH = 'login_auth'
export const AUTHENTICATE_ROUTE = 'authenticate_route'
export const ADMIN_LOGOUT = 'admin_logout'
export const UI_START_LOADING = 'UI_START_LOADING'
export const UI_STOP_LOADING = 'UI_STOP_LOADING'

const PROJECTS_URL = '/api/api'
const BLOG_URL = '/api/blog'
const LOGIN_URL = '/api/signin'
// const SIGNUP_URL = "/api/signup";
const AUTHENTICATE_URL = '/api/authenticate'
const SIGN_OUT = '/api/token'

export function fetchProjects (cb) {
  const request = axios.get(PROJECTS_URL
  ).then((data) => {
    cb()
    return data
  })
  return {
    type: FETCH_PROJECTS,
    payload: request
  }
}

export function deleteProject (id) {
  const request = axios.delete(`${PROJECTS_URL}/${id}`, {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  })
  return {
    type: DELETE_PROJECT,
    payload: request
  }
}

// export function addProject(values, callback) {

//     var image = document.getElementById("upload").files[0];
//     var form = document.getElementById("form");
//     var bodyFormData = new FormData(form);
//     bodyFormData.append("avatar", image);

//     const request = axios({
//         method: "post",
//         url: PROJECTS_URL,
//         data: bodyFormData,
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             'x-auth': localStorage.getItem("token")
//         }

//     }).then(() => {
//         callback()
//     });

//     return {
//         type: ADD_PROJECT,
//         payload: request
//     };
// }

// export function fetchBlog(cb) {
//     const request = axios.get(BLOG_URL
//         ).then((data)=>{
//             cb()
//             return data
//         });
//         return {
//             type: FETCH_BLOG,
//             payload: request
//         };
// }

export const selectedBlog = async (id, callback) => {
  const request = await axios.get(`${BLOG_URL}/${id}`)
  // setTimeout(()=>{callback()}, 000)

  return {
    type: SELECTED_BLOG,
    payload: request
  }
}

export function deleteBlog (id) {
  const request = axios.delete(`${BLOG_URL}/${id}`, {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  })

  return {
    type: DELETE_BLOG,
    payload: request
  }
}

export function handleAdminChart (e) {
  return {
    type: ADMIN_CHART,
    payload: e.target.id
  }
}

export function addBlog (callback) {
  console.log('check')
  var form = document.getElementById('blogform')
  var bodyFormData = new FormData(form)
  for (var pair of bodyFormData.entries()) {
    console.log(pair[0] + ', ' + pair[1])
  }
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

export function selectedProject (id, callback) {
  const request = axios.get(`${PROJECTS_URL}/${id}`)

  request.then(() => {
    callback()
  })

  return {
    type: SELECTED_PROJECT,
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
    console.log('status', 'OK')
  }, (data) => {
    cb()
  })
  console.log('authrequest', request)
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
    console.log('logged out')
    cb()
    localStorage.removeItem('token')
  })

  return {
    type: ADMIN_LOGOUT,
    payload: 'logged out'
  }
}
