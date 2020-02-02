import React, { Component } from 'react'
import LogoutButton from '../components/logoutButton'
import Navbar from '../components/Navbar'
import { authenticateRoute, adminLogout, deleteProject, updateProjectOrder, selectProject, deleteBlog, updateBlogOrder, selectBlog } from '../actions'
import { withRouter, Link } from 'react-router-dom'

import { connect } from 'react-redux'

import AdminList from '../components/AdminList'
import EditBlog from '../components/editBlog'
import EditProject from '../components/editProject'

class Admin extends Component {
  state={
    isLoadedProjects: false,
    isLoadedBlog: false,
    adminChart: 'projects'
  }

  componentDidUpdate (prevProps) {
    if (this.props.projects !== prevProps.projects) {
      this.setState({ adminChart: 'projects' })
    }
  }

  // componentDidMount () {
  //   this.props.authenticateRoute(() => {
  //     localStorage.removeItem('token')
  //     this.props.history.push('/Login')
  //   })
  // }

  handleLogout = () => {
    this.props.adminLogout()
    this.props.history.push('/Login')
    localStorage.removeItem('token')
  }

  render () {
    const { deleteProject, selectProject, updateProjectOrder, projects, blog, updateBlogOrder, deleteBlog, selectBlog } = this.props
    const { adminChart } = this.state
    return (
      <React.Fragment>
        <div className="body" style={{ height: 'auto', overflow: 'scroll' }}>
          <Navbar title="Admin Page" />
          <div className="body__container-portfolio" style={{ height: 'auto', overflow: 'scroll' }}>
            <React.Fragment>
              <div className="projects-table__wrapper" >
                <div style={{ minHeight: '5rem', marginTop: '5rem' }}/>
                <table
                  id="fetchTable"
                  className="projects-table">
                  <thead
                    className="projects-table__head">
                    <tr>
                      <th>
                        <span
                          className="pointer"
                          style={{ color: adminChart === 'blog' ? '#007bff' : '' }}
                          id="projects"
                          onClick={() => this.setState({ adminChart: 'projects' })}>
                      Projects
                        </span>
                    /
                        <span
                          className="pointer"
                          style={{ color: adminChart === 'projects' ? '#007bff' : '' }}
                          id="blog"
                          onClick={() => this.setState({ adminChart: 'blog' })}>
                      Blog
                        </span>
                        {adminChart === 'blog'
                          ? <Link
                            style={{ float: 'right' }}
                            to="/CreateBlog">
                            <i className="fas fa-plus"></i>
                          </Link>
                          : <Link
                            style={{ float: 'right' }}
                            to="/CreateProject">
                            <i className="fas fa-plus"></i>
                          </Link>}
                      </th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {adminChart === 'blog'
                    ? <AdminList
                      deleteListItem={deleteBlog}
                      updateListOrder={updateBlogOrder}
                      list={blog}
                      selectListItem={selectBlog}
                    />
                    : <AdminList
                      deleteListItem={deleteProject}
                      updateListOrder={updateProjectOrder}
                      list={projects}
                      selectListItem={selectProject}
                    />

                  }
                </table>
                <div style={{ minHeight: '5rem', marginBottom: '5rem', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  <LogoutButton logout={this.handleLogout.bind(this)}/>

                </div>
              </div>

            </React.Fragment>
          </div>
        </div>
        <EditBlog />
        <EditProject />

      </React.Fragment>

    )
  }
}

function mapStateToProps (state) {
  return {
    selectedBlog: state.selectedBlog,
    blog: state.blog,
    projects: state.projects,
    adminChart: state.adminChart,
    editName: state.editName,
    selectedProject: state.selectedProject
  }
}

export default connect(mapStateToProps, {
  authenticateRoute,
  adminLogout,
  deleteProject,
  updateProjectOrder,
  selectProject,
  deleteBlog,
  updateBlogOrder,
  selectBlog
})(withRouter(Admin))
