import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Navbar from './navbar'
import { connect } from 'react-redux'
import { addBlog, authenticateRoute } from '../actions'
import TextInput from './Forms/TextInput'
import TextArea from './Forms/TextArea'
import FileInput from './Forms/FileInput'

class NewBlogEntry extends Component {
  onSubmit () {
    this.props.addBlog(() => {
      this.props.history.push('/Admin')
    })
  }

  fileChangedHandler (e) {
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className="body" style={{ justifyContent: 'center' }}>
        <Navbar />
        <div style={{
          padding: '3rem',
          backgroundColor: 'white',
          // border: '1px solid purple',
          flexDirection: 'column',
          width: '40rem',
          justifyContent: 'center',
          alignSelf: 'center'
        }}>
          <form id="blogform" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field label="Title" name="title" component={TextInput}/>
            <Field label="Text" name="text" component={TextArea}/>
            <Field name="blogImg" component={FileInput}/>
            <button className="admin-login" type="submit">Submit</button>
          </form>
        </div>
      </div>)
  }
}

function validate (values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Required'
  }
  return errors
}

export default reduxForm({

  validate,
  form: 'NewForm'
})(
  connect(null, { addBlog, authenticateRoute })(NewBlogEntry)
)
