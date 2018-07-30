import axios from "axios";
export const FETCH_PROJECTS = "fetch_projects";
export const DELETE_PROJECT = "delete_project";
export const ADD_PROJECT = "add_project";
export const FETCH_BLOG = "fetch_blog";
export const SELECTED_BLOG = "selected_blog";
export const SELECTED_PROJECT = "selected_project";
export const DELETE_BLOG = "delete_blog";
export const ADMIN_CHART = "admin_chart";
export const ADD_BLOG = "add_blog";
export const EDIT_NAME = "edit_name";
export const UPDATED_BLOG = "upadated_blog";
export const UPDATED_PROJECTS = "updated_projects";
export const LOGIN_AUTH = "login_auth";
export const AUTHENTICATE_ROUTE = "authenticate_route";
export const ADMIN_LOGOUT = "admin_logout";
const PROJECTS_URL = "https://quiet-taiga-43727.herokuapp.com/api";
const BLOG_URL = "https://quiet-taiga-43727.herokuapp.com/blog";
const LOGIN_URL = "https://quiet-taiga-43727.herokuapp.com/signin";
const SIGNUP_URL = "https://quiet-taiga-43727.herokuapp.com/signup";
const AUTHENTICATE_URL = "https://quiet-taiga-43727.herokuapp.com/authenticate";
const SIGN_OUT = "https://quiet-taiga-43727.herokuapp.com/token";



export function fetchProjects() {
    const request = axios.get(PROJECTS_URL);
     return {
        type: FETCH_PROJECTS,
        payload: request
    };
}

export function deleteProject(id) {

    const request = axios.delete(`${PROJECTS_URL}/${id}`, {
        headers: {
            'x-auth': localStorage.getItem("token")
        }
    })
    return {
        type: DELETE_PROJECT,
        payload: request
    };
}

export function addProject(values, callback) {

    var image = document.getElementById("upload").files[0];
    var form = document.getElementById("form");
    var bodyFormData = new FormData(form);
    bodyFormData.append("avatar", image);

    const request = axios({
        method: "post",
        url: PROJECTS_URL,
        data: bodyFormData,
        headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth': localStorage.getItem("token")
            }

    }).then(() => {
        callback()
    });

    return {
        type: ADD_PROJECT,
        payload: request
    };
}

export function fetchBlog() {
    const request = axios.get(BLOG_URL);

    return {
        type: FETCH_BLOG,
        payload: request
    };
}

export function selectedBlog(id, callback) {
    const request = axios.get(`${BLOG_URL}/${id}`)

    request.then(() => {
        callback()
    })

    return {
        type: SELECTED_BLOG,
        payload: request
    };
}

export function deleteBlog(id) {
    let request = axios.delete(`${BLOG_URL}/${id}`, {
        headers: {
            'x-auth': localStorage.getItem("token")
        }
    });

    return {
        type: DELETE_BLOG,
        payload: request
    };
}

export function handleAdminChart(e) {

    return {
        type: ADMIN_CHART,
        payload: e.target.id
    };

}

export function addBlog(values, callback) {

    var form = document.getElementById("blogform");
    var bodyFormData = new FormData(form);

    for (var pair of bodyFormData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    const request = axios.post(BLOG_URL,bodyFormData,{headers: {'x-auth': localStorage.getItem("token")}
    }).then(() => {
        callback()
    });


    return {
        type: ADD_BLOG,
        payload: request
    };
}

export function selectedProject(id, callback) {
    console.log(id)
    const request = axios.get(`${PROJECTS_URL}/${id}`)

    request.then(() => {

        callback()
    })
console.log("req", request)
    return {
        type: SELECTED_PROJECT,
        payload: request
    };

}

export function patchItem(e) {
    var form = document.getElementById(e.target.id)

    var bodyFormData = new FormData(form);
    var key = [];
    for (var pair of bodyFormData.entries()) {

        key.push(pair[1]);
    }
     var body = {
        [key[0]]: key[1]
    };

console.log("testin 7/27", e.target.name)

    if (e.target.id === "blogForm") {

        const request = axios.patch(`${BLOG_URL}/${e.target.name}`, body, {
            headers: {
                'x-auth': localStorage.getItem("token")
            }
        })

        return {
            type: UPDATED_BLOG,
            payload: request
        }
    } else {
        const request = axios.patch(`${PROJECTS_URL}/${e.target.name}`, body, {
            headers: {
                'x-auth': localStorage.getItem("token")
            }
        })

        return {
            type: UPDATED_PROJECTS,
            payload: request
        }
    }
}

export function loginAuth(cb) {
    var form = document.getElementById("loginForm")

    var bodyFormData = new FormData(form);
    var entries = []
    for (var pair of bodyFormData.entries()) {
        entries.push(pair[1])
    }

    const request = axios.post(LOGIN_URL, {
            "email": entries[0],
            "password": entries[1]
        })
        .then((data) => {
            return localStorage.setItem("token", data.headers["x-auth"])
        }).then(()=>{cb()});

    return {
        type: LOGIN_AUTH,
        payload: request
    }
}

export function authenticateRoute(cb){
    const request = axios.get(AUTHENTICATE_URL, {headers:{"x-auth":localStorage.getItem("token")}}).then((data)=>{
        console.log("status","OK");
}, (data)=>{  cb()
}
)
    console.log('authrequest', request);
    return {
        type: AUTHENTICATE_ROUTE,
        payload: request
    }

}

export function adminLogout(cb){

    axios.delete(SIGN_OUT, {headers:{"x-auth":localStorage.getItem("token")}}).then(()=>{
        console.log("logged out")
        cb();
        localStorage.removeItem("token");
    })

    return{
        type:ADMIN_LOGOUT,
        payload:"logged out"
    }
}