import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ProjectsReducer from './reducer_projects'
import BlogReducer from './reducer_blog'
import SelectedBlogReducer from './reducer_selectedBlog'
import SelectedProjectReducer from './reducer_selectedProject'
import UIReducer from './reducer_ui'
import auth from './authenticationReducer'

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  blog: BlogReducer,
  selectedBlog: SelectedBlogReducer,
  form: formReducer,
  selectedProject: SelectedProjectReducer,
  ui: UIReducer,
  isLoggedIn: auth
})

export default rootReducer
