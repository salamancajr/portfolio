import React, { Component } from 'react'
import Navbar from '../components/navbar'
export default class App extends Component {
  state = {
    boxText: ''
  }

  render () {
    return (
      <div className="body" style={{ minHeight: '500px' }}>
        <Navbar title="Home | George Salamanca"/>
        <div className="body__container-row">
          <div class="card" style={{ maxWidth: '36rem', padding: '2rem' }}>
            <div class="card-body text-dark">
              <h5 class="card-title">Welcome to my developer page.</h5>
              <p class="card-text">You'll find a little info about me. You can see some of my projects and find my contact information. Enjoy!.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
