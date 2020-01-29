import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ProjectsReducer from './reducer_projects'
import BlogReducer from './reducer_blog'
import SelectedBlogReducer from './reducer_selectedBlog'
import SelectedProjectReducer from './reducer_selectedProject'
import UIReducer from './reducer_ui'

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  blog: BlogReducer,
  selectedBlog: SelectedBlogReducer,
  form: formReducer,
  selectedProject: SelectedProjectReducer,
  ui: UIReducer
})

export default rootReducer
