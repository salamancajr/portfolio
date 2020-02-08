import { getPresignedURL } from './common'
import { addProject, fetchProjects, updateProjectOrder, deleteProject, editProject } from './projects'
import { fetchBlogApi, updateBlogOrder, deleteBlog, likeBlog } from './blogs'
import { adminLogout, adminSignIn, authenticateRoute } from './auth'
export default { editProject, authenticateRoute, adminSignIn, adminLogout, likeBlog, getPresignedURL, addProject, fetchProjects, fetchBlogApi, updateProjectOrder, updateBlogOrder, deleteBlog, deleteProject }
