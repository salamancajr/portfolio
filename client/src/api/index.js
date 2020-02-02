import { getPresignedURL } from './common'
import { addProject, fetchProjects, updateProjectOrder, deleteProject } from './projects'
import { fetchBlogApi, updateBlogOrder, deleteBlog, likeBlog } from './blogs'
import { adminLogout, adminSignIn, authenticateRoute } from './auth'
export default { authenticateRoute, adminSignIn, adminLogout, likeBlog, getPresignedURL, addProject, fetchProjects, fetchBlogApi, updateProjectOrder, updateBlogOrder, deleteBlog, deleteProject }
