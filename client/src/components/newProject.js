import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Navbar from './navbar'
import { connect } from 'react-redux'
import { authenticateRoute } from '../actions'
import addProject from '../sagas/addProjectSaga'

class NewProject extends Component {
  renderField (field) {
    return (
      <div>
        <label>{field.label}</label>

        <input
          type={field.type}
          {...field.input}
        />
        {field.meta.error}
      </div>
    )
  }

  fileChangedHandler (e) {
 
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className="body">
        <Navbar />
        <div className="body__container-column">
          <form
            id="form"
            onSubmit={handleSubmit(addProject())}>

            <Field
              label="title"
              name="title"
              type="text"
              component={this.renderField}
            />
            <Field
              label="description"
              name="description"
              type="textarea"
              component={this.renderField}
            />
            <Field
              label="githubLink"
              name="githubLink"
              type="text"
              component={this.renderField}
            />
            <Field
              label="link"
              name="link"
              type="text"
              component={this.renderField}
            />
            <label className="admin-login" htmlFor="upload">
              <i className="fas fa-cloud-upload-alt"></i>
                        upload
            </label>
            <input type="file" onChange ={this.fileChangedHandler} name="" label="upload" id="upload"/>

            <button className="admin-login"type="submit">Submit</button>
          </form>
        </div>
      </div>)
  }
}

function validate (values) {
  const errors = {}
  return errors
}

export default reduxForm({

  validate,
  form: 'NewForm'
})(
  connect(null, { addProject, authenticateRoute })(NewProject)
)
