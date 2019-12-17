import React, { Component } from 'react'
import { patchItem } from '../actions'
import { connect } from 'react-redux'
import TextInput from './Forms/TextInput'
import TextArea from './Forms/TextArea'
import FileInput from './Forms/FileInput'
import { Field, reduxForm } from 'redux-form'
import Modal from './Modal'

class EditBlog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      title: '',
      description: '',
      link: '',
      githubLink: '',
      option: 'text',
      orderNum: ''
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.patchItem(e)
  }

  render () {
    return (

      <Modal control="editBlog">
        <div style={{
          padding: '3rem',
          backgroundColor: 'white',
          // border: '1px solid purple',
          flexDirection: 'column',
          width: '40rem',
          justifyContent: 'center',
          alignSelf: 'center'
        }} class="modal-content">
          <form
            id="blogform"
            // onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <Field label="Title" name="title" component={TextInput}/>
            <Field label="Text" name="text" component={TextArea}/>
            <Field name="blogImg" component={FileInput}/>
            <button className="admin-login" type="submit">Submit</button>
          </form>
        </div>

      </Modal>
    )
  }
}
function mapStateToProps ({ selectedBlog: { title, text } }) {
  return {
    initialValues: {
      title,
      text
    }
  }
}
export default connect(mapStateToProps, { patchItem })(reduxForm({ form: 'editBlog', enableReinitialize: true })(EditBlog))
