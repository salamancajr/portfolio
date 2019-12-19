import React, { Component } from 'react'
import Navbar from '../components/navbar'
import _ from 'lodash'
import Loading from '../components/Loading'
import { fetchProjects } from '../sagas/projectsSagas'
import { connect } from 'react-redux'
import Modal from '../components/Modal'
class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shift: 0,
      pickedProject: {}
    }
  }

  componentDidMount () {
    window.addEventListener('resize', () => {
      var a = document.getElementsByClassName('projects-container__project')

      for (let i = 0; i < a.length; i++) {
        a[i].style.top = 0 + 'px'
      }
      this.setState({ shift: 0 })
    })

    fetchProjects()
  }

  handleClick (e) {
    var a = document.getElementById(e.target.id)

    a.click()
    this.setState({
      pickedProject: this.props.projects.find(function (project) {
        return project.title === e.target.id
      })
    })
  }

  handleClickDown () {
    var a = document.getElementsByClassName('projects-container__project')
    var b = document.getElementsByClassName('projects-container')[0]

    _.map(a, (project) => {
      this.setState({

        shift: this.state.shift - b.offsetHeight
      }, () => {
        // project.style.top = +this.state.shift+"px"
        project.style.transform = `translateY(${+this.state.shift + 'px'})`
      })
    })
  }

  handleClickUp () {
    var a = document.getElementsByClassName('projects-container__project')
    var b = document.getElementsByClassName('projects-container')[0]
    if (this.state.shift !== 0) {
      _.map(a, (project) => {
        this.setState({

          shift: this.state.shift + b.offsetHeight
        }, () => {
          project.style.transform = `translateY(${+this.state.shift + 'px'})`
        })
      })
    }
  }

        handleClickExitVideo=() => {
          const iframe = document.querySelector('.iframe__container')
          iframe.style.display = 'none'
        }

        renderProjects () {
          return _.map(this.props.projects, project => {
            return (
              <a

                href={'#'}
                key={project.title}
                id={project.title}
                className="projects-container__project projects-container__a" >
                <label
                  data-toggle="modal"
                  data-target="#description"
                  htmlFor="chex"
                  className="projects-container__label"
                  onClick={this.handleClick.bind(this)}>
                  <img
                    id={project.title}
                    className="projects-container__img"
                    src={project.img}
                    alt={project.title}/>
                  <div
                    id={project.title}
                    className="projects-container__heading-tertiary">
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
                <Navbar title='My Portfolio'/>
                <div className="body__container-portfolio" style={{ justifyContent: 'center' }}>
                  <div className="iframe__container">
                    <label htmlFor="description__checkbox">
                      <span onClick={this.handleClickExitVideo} className="iframe__container__exit pointer scale">&times;</span>
                    </label>
                    <input
                      type="checkbox"
                      className="description__checkbox"
                      id="description__checkbox"/>
                    <iframe
                      className="description-box__video"
                      title="luvtipp-video"
                      width="460"
                      height="240"
                      src={pickedProject ? pickedProject.youtubeLink : null}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen>
                    </iframe>
                  </div>
                  <div style={{ display: 'grid', position: 'relative' }}>
                    <div className="projects-container">

                      <input
                        type="checkbox"
                        className="projects-container__checkbox"
                        id="chex" />
                      {
                        this.props.isLoading
                          ? <Loading/>
                          : this.renderProjects()
                      }
                    </div>
                  </div>
                </div>

              </div>
              <Modal control="description">
                <div class="modal-content" style={{ padding: '2rem' }}>
                  <h1>
                    {pickedProject.title}
                  </h1>
                  <p>
                    {pickedProject.description}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {pickedProject.githubLink !== 'none' && <a style={{ backgroundColor: 'purple', minWidth: '5rem', border: 'none' }} type="button" target='_blank' href={pickedProject.githubLink} class="btn btn-dark">Github</a>}
                    <a style={{ backgroundColor: 'purple', minWidth: '5rem', border: 'none' }} type="button" target='_blank' href={pickedProject.link} class="btn btn-dark">Link</a>
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

export default connect(mapStateToProps)(Portfolio)
