import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { login } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../components/Forms/TextInput'

class Login extends Component {
  onSubmit = values => {
    this.props.login(values, () => {
      this.props.history.push('/Admin')
    })
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <div className="body">
        <Navbar title="Admin Page" />
        <div className="body__container-column">
          <form style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: 'white', padding: '3rem', borderRadius: 5 }} id="loginForm" onSubmit={handleSubmit(this.onSubmit)}>
            <Field name="email" type="email" component={TextInput}/>
            <Field name="password" type="password" component={TextInput}/>
            <input className="admin-login" type="submit" style={{ alignSelf: 'center' }} />
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, { login })(reduxForm({ form: 'login' })(Login))
