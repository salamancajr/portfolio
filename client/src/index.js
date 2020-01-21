import React from 'react'
import ReactDOM from 'react-dom'
import './css/style.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './containers/home'
import About from './components/about'
import Contact from './components/contact'
import Portfolio from './containers/portfolio'
import Login from './containers/login'
import Admin from './containers/admin'
import NewProject from './components/newProject'
import NewBlogEntry from './components/newBlogEntry'
import Blog from './containers/blog'
import BlogEntry from './containers/blogEntry'
import EditProject from './components/editProject'
import reducers from './reducers'
import { fetchProjects } from './sagas/projectsSagas'
import { fetchBlog } from './sagas/blogSagas'

import promise from 'redux-promise'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const createStoreWithMiddleware = applyMiddleware(promise, thunk, sagaMiddleware)(createStore)

ReactDOM.render(

  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/About" component={About}/>
          <Route path="/Contact" component={Contact}/>
          <Route path="/Portfolio" component={Portfolio}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Admin" component={Admin}/>
          <Route path="/NewBlogEntry" component={NewBlogEntry}/>
          <Route path="/NewProject" component={NewProject}/>
          <Route path="/BlogEntry" component={BlogEntry}/>
          <Route path="/Blog" component={Blog}/>
          <Route path="/EditProject" component={EditProject}/>
          <Route path="/" component={Home}/>

        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'))

sagaMiddleware.run(fetchProjects)
// sagaMiddleware.run(fetchBlog)
export { sagaMiddleware }