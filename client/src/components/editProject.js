import React, { Component } from 'react'
import Navbar from './navbar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class EditProject extends Component {
  render () {
    return (
      <div className="body">
        <Navbar />
        <div className="body__container-column">
          <form id="form">
            <select name="updataBlog">
              <option value="title"></option>
              <option value="text"></option>
            </select>
            <Link className="admin-login" to="/Admin">Submit</Link>
          </form>
        </div>
      </div>)
  }
}

function mapStateToProps (state) {
  return {

  }
}

export default connect(mapStateToProps, {})(EditProject)
