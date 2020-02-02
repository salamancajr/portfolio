import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import _ from 'lodash'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
import { fetchProjects } from '../actions'

class Portfolio extends Component {
state = {
  pickedProject: {}
};

handleClick (e) {
  var a = document.getElementById(e.target.id)

  a.click()
  this.setState({
    pickedProject: this.props.projects.find(function (project) {
      return project.title === e.target.id
    })
  })
}

handleClickExitVideo = () => {
  const iframe = document.querySelector('.iframe__container')
  iframe.style.display = 'none'
};

renderProjects () {
  return _.map(this.props.projects, (project) => {
    return (
    // eslint-disable-next-line
      <a
        href={'#'}
        key={project.title}
        id={project.title}
        className="projects-container__project projects-container__a"
      >
        <label
          data-toggle="modal"
          data-target="#description"
          htmlFor="chex"
          className="projects-container__label"
          onClick={this.handleClick.bind(this)}
        >
          <img
            id={project.title}
            className="projects-container__img"
            src={project.img}
            alt={project.title}
          />
          <div id={project.title} className="projects-container__heading-tertiary">
            <span>{project.title}</span>
          </div>
        </label>
      </a>
    )
  })
}

render () {
  const { pickedProject } = this.state
  return (
    <React.Fragment>
      <div className="body" style={{ overflowY: 'scroll' }}>
        <Navbar title="My Portfolio" />
        <div className="body__container-portfolio" style={{ justifyContent: 'center' }}>
          <div className="iframe__container">
            <label htmlFor="description__checkbox">
              <span
                onClick={this.handleClickExitVideo}
                className="iframe__container__exit pointer scale"
              >
                &times;
              </span>
            </label>
            <input type="checkbox" className="description__checkbox" id="description__checkbox" />
            <iframe
              className="description-box__video"
              title="luvtipp-video"
              width="460"
              height="240"
              src={pickedProject ? pickedProject.youtubeLink : null}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
          <div style={{ display: 'grid', position: 'relative' }}>
            <div className="projects-container">
              <input type="checkbox" className="projects-container__checkbox" id="chex" />
              {this.props.isLoading ? <Loading /> : this.renderProjects()}
            </div>
          </div>
        </div>
      </div>
      <Modal control="description">
        <div class="modal-content modal-container" style={{ padding: '2rem' }}>
          <h1 style={{ textAlign: 'center', paddingBottom: '1rem', fontWeight: 'bold' }}>
            {pickedProject.title}
          </h1>
          <p style={{ textAlign: 'center', paddingBottom: '1rem', minWidth: '30rem' }}>
            {pickedProject.description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <a
              style={{
                padding: '1rem 4rem 1rem',
                borderRadius: '2rem',
                backgroundColor: 'purple',
                minWidth: '5rem',
                border: 'none'
              }}
              type="button"
              target="_blank"
              href={pickedProject.githubLink}
              class={`btn btn-dark ${pickedProject.githubLink === 'none' ? 'disabled' : ''}`}
            >
              Github
            </a>
            <a
              style={{
                backgroundColor: 'purple',
                minWidth: '5rem',
                border: 'none',
                padding: '1rem 4rem 1rem',
                borderRadius: '2rem'
              }}
              type="button"
              target="_blank"
              href={pickedProject.link}
              class="btn btn-dark"
            >
              Link
            </a>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}
}

function mapStateToProps (state) {
  return {
    isLoading: state.ui.isLoading,
    projects: state.projects
  }
}

export default connect(mapStateToProps, { fetchProjects })(Portfolio)
