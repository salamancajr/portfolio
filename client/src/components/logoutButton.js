import React, { Component } from 'react'

export default class extends Component {
  render () {
    return (
      <button className="admin-login" onClick={() => { this.props.logout() }}>
            Log Out
      </button>
    )
  }
}
