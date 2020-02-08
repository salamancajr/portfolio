import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import _ from 'lodash'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import { fetchProjects } from '../actions'
import {
  isMobile
} from 'react-device-detect'

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
      <div  
        key={project.title}
        id={project.title}
        className="projects-container__project"
        onClick={(e) => isMobile && this.flip(e, project.title)}
        onMouseOver={e => this.flip(e, project.title)}
        onMouseLeave={e => this.flipInverse(e, project.title)}
      >
        <div className={'cardTurn'} id={`card${project.title}`}>
          <div
            className="projects-container__project__front">

            <img
              id={project.title}
              className="projects-container__img"
              src={project.img}
              alt={project.title}
            />
            <div id={project.title} className="projects-container__heading-tertiary">
              <span>{project.title}</span>
            </div>

          </div>
          <div className="projects-container__project__back">
            <div className="projects-container__project__back__description">
              {project.description}
            </div>
            <div className="projects-container__project__back__button-container">
              {project.githubLink !== 'none' && <a
                target="_blank"
                href={project.githubLink}
                className="projects-container__project__back__button">
              Github
              </a>}
              <a
                target="_blank"
                href={project.link}
                className="projects-container__project__back__button">
              Link
              </a>
            </div>

          </div>
        </div>

      </div>
    )
  })
}

flip = _.debounce((e, id) => {
  document.getElementById(`card${id}`).classList.add('flip')
  document.getElementById(id).style.zIndex = 1
}, 0, { leading: true })

flipInverse = _.debounce((e, id) => {
  document.getElementById(`card${id}`).classList.remove('flip')
  setTimeout(() => { document.getElementById(id).style.zIndex = 0 }, 400)
}, 0, { leading: true })

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
