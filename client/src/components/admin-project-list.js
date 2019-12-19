import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteProject, selectedProject } from '../actions'
import Sortable from 'react-sortablejs'
import _ from 'lodash'

class ProjectList extends Component {
  callToDelete (e) {
    this.props.deleteProject(e.target.id)
  }

handleDrag = (e) => {
  const order = []
  const array = e.target.parentElement.childNodes
  for (let i = 0; i < array.length; i++) {
    order.push({ orderNum: i, id: array[i].id })
  }
  fetch('https://quiet-taiga-43727.herokuapp.com/projectOrder', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ order })
  }).then(data => console.log('data', data)
  )
}

renderProjectList (e) {
  return _.map(this.props.projects, project => {
    return (
      <tr key={project._id}
        id={project._id}
        draggable="true"
        onDragEndCapture={(e) => this.handleDrag(e)}
      >
        <th>{project.title}</th>
        <th>
          <label htmlFor="blogListCheck">
            <i
              name={project.title}
              id={project.title}
              onClick={(e) => this.props.selectedProject(e.target.id, () => { console.log('testing') })}
              className="fas fa-edit pointer"
              data-target="#editProject"
              data-toggle="modal"
            >
            </i>
          </label>

        </th>
        <th>
          <i
            id={project._id}
            onClick={() => document.getElementById(`warning${project._id}`).style.display = 'block'}
            className="fas fa-trash pointer">
          </i>
        </th>
        <th id={`warning${project._id}`} className="warning">
          <h3>
                            Are you sure you want to delete <span className="warning__span">{project.title}?</span>
          </h3>
          <button
            id={project._id}
            onClick={this.callToDelete.bind(this)}
            className="warning__button pointer">
                            Delete
          </button>
          <button onClick={() => document.getElementById(`warning${project._id}`).style.display = 'none'} className="warning__button pointer">
                            Cancel
          </button>
        </th>
      </tr>
    )
  })
}

render () {
  return (
    <Sortable tag="tbody" className="projects-table__body">
      {this.renderProjectList()}
    </Sortable>
  )
}
}

function mapStateToProps (state) {
  return {
    projects: state.projects
  }
}
export default connect(mapStateToProps, { deleteProject, selectedProject })(ProjectList)
