import React, { Component } from 'react'
import { editBlog } from '../actions'
import { connect } from 'react-redux'
import TextInput from './Forms/TextInput'
import TextArea from './Forms/TextArea'
import FileInput from './Forms/FileInput'
import { Field, reduxForm } from 'redux-form'
import Modal from './Modal'

class EditBlog extends Component {
  onSubmit (values) {
    this.props.editBlog({ ...values, img: values.img[0] })
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <Modal control="editBlog">
        <div style={{
          padding: '3rem',
          backgroundColor: 'white',
          flexDirection: 'column',
          width: '40rem',
          justifyContent: 'center',
          alignSelf: 'center'
        }} class="modal-content">
          <form
            id="blogform"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <Field label="Title" name="title" component={TextInput}/>
            <Field label="Text" name="text" component={TextArea}/>
            <Field name="img" component={FileInput}/>
            <button className="admin-login" type="submit">Submit</button>
          </form>
        </div>

      </Modal>
    )
  }
}
function mapStateToProps ({ selectedBlog: { title, text, _id } }) {
  return {
    initialValues: {
      title,
      text,
      _id
    }
  }
}
export default connect(mapStateToProps, { editBlog })(reduxForm({ form: 'editBlog', enableReinitialize: true })(EditBlog))
