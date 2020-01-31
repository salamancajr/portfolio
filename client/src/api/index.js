import { getPresignedURL } from './common'
import { addProject, fetchProjects, updateProjectOrder, deleteProject } from './projects'
import { fetchBlogApi, updateBlogOrder, deleteBlog, likeBlog } from './blogs'
export default { likeBlog, getPresignedURL, addProject, fetchProjects, fetchBlogApi, updateProjectOrder, updateBlogOrder, deleteBlog, deleteProject }
