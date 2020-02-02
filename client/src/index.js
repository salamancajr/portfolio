import React from 'react'
import ReactDOM from 'react-dom'
import './css/style.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './containers/Home'
import About from './containers/About'
import Contact from './containers/Contact'
import Portfolio from './containers/Portfolio'
import Login from './containers/Login'
import Admin from './containers/Admin'
import CreateProject from './containers/CreateProject'
import CreateBlog from './containers/CreateBlog'
import Blog from './containers/Blog'
import SelectedBlog from './containers/SelectedBlog'
import reducers from './reducers'
import rootSaga from './sagas'
import createSagaMiddleware from 'redux-saga'
import { FETCH_BLOG, FETCH_PROJECTS } from './actions'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
))
ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/About" component={About}/>
          <Route path="/Contact" component={Contact}/>
          <Route path="/Portfolio" component={Portfolio}/>
          <Route path="/Login" component={Login}/>
          <PrivateRoute path="/Admin"><Admin/></PrivateRoute>
          <PrivateRoute path="/CreateBlog"><CreateBlog /></PrivateRoute>
          <PrivateRoute path="/CreateProject"><CreateProject /></PrivateRoute>
          <Route path="/SelectedBlog" component={SelectedBlog}/>
          <Route path="/Blog" component={Blog}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'))

function PrivateRoute ({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        store.getState().isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/Login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

sagaMiddleware.run(rootSaga)
store.dispatch({ type: FETCH_PROJECTS })
store.dispatch({ type: FETCH_BLOG })
