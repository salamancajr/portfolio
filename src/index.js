import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/home';
import About from "./components/about";
import Contact from "./components/contact";
import Portfolio from "./components/portfolio";
import Login from "./components/login";
import Admin from "./components/admin";
import NewProject from "./components/newProject";
import NewBlogEntry from "./components/newBlogEntry";
import Blog from "./components/blog"
import BlogEntry from "./components/blogEntry";
import EditProject from "./components/editProject";
import reducers from './reducers';
import promise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(

<Provider store={createStoreWithMiddleware(reducers)}>
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
      {/* <PrivateRoute path="/protected" component={Protected}/> */}

      </Switch>
    </div>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
