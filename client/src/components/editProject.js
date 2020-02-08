import React, { Component } from 'react'
import { editProject } from '../actions'
import { connect } from 'react-redux'
import TextInput from './Forms/TextInput'
import TextArea from './Forms/TextArea'
import FileInput from './Forms/FileInput'
import { Field, reduxForm } from 'redux-form'
import Modal from './Modal'

class EditProject extends Component {
  onSubmit (values) {
    this.props.editProject({ ...values, img: values.img })
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <Modal control="editProject">
        <div style={{
          padding: '3rem',
          backgroundColor: 'white',
          flexDirection: 'column',
          width: '40rem',
          justifyContent: 'center',
          alignSelf: 'center'
        }} class="modal-content">
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
          >
            <Field label="Title" name="title" component={TextInput}/>
            <Field label="Link" name="link" component={TextInput}/>
            <Field label="Github" name="githubLink" component={TextInput}/>
            <Field label="YouTube" name="youtubeLink" component={TextInput}/>
            <Field label="Description" name="description" component={TextArea}/>
            <Field name="img" component={FileInput}/>
            <button className="admin-login" type="submit">Submit</button>
          </form>
        </div>

      </Modal>
    )
  }
}
function mapStateToProps (state) {
  return {
    initialValues: {
      ...state.selectedProject
    }
  }
}
export default connect(mapStateToProps, { editProject })(reduxForm({ form: 'editProject', enableReinitialize: true })(EditProject))
