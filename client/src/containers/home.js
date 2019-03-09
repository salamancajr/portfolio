import React, {Component} from 'react';
import Navbar from "../components/navbar"
export default class App extends Component {

  render() {
    return (
      <div className="body" style={{minHeight:"500px"}}>
        <Navbar />
        <div className="body__container-row">
          <div className="column-1"></div>
          <div className="column-2">
            <h1 className="moveRight">
              <strong>George's Web Developer Page
                <hr />
              </strong>
            </h1>
            <p  className="moveLeft">
              <br />
              Welcome to my developer page! You can find a little information about me. You can see some of the projects I
              have completed so far and you can get my contact information. Enjoy!
            </p>
          </div>
          <div className="column-3"></div>
          <div className="column-4">
            <a className="column-4__button"href="https://www.linkedin.com/in/george-salamanca-514b5084/" target="_blank" rel="noopener noreferrer">
              <strong>LinkedIn</strong>
              <i className="fab fa-linkedin-square"></i>
            </a>
            <a className="column-4__button"href="https://www.facebook.com/george.salamanca.9" target="_blank" rel="noopener noreferrer">
              <strong>Facebook</strong>
              <i className="fab fa-facebook"></i>
            </a>
            <a className="column-4__button" href="https://github.com/salamancajr" target="_blank" rel="noopener noreferrer">
              <strong>Github</strong>
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}