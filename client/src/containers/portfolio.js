import React, { Component } from 'react'
import Navbar from '../components/navbar'
import _ from 'lodash'
import Description from '../components/description'
import Loading from '../components/Loading'
import { fetchProjects } from '../sagas/projectsSagas'
import { connect } from 'react-redux'
let pickedProject

class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shift: 0

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
    const boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'

    setTimeout(() => {
      const projectsContainer = document.querySelector('.projects-container')
      projectsContainer.style.boxShadow = boxShadow
      projectsContainer.style.borderRadius = '5px'
    }, 900)

    // document.getElementsByClassName("up")[0].style.transform = "scale(0)"
    // document.getElementsByClassName("down")[0].style.transform = "scale(0)"

    var a = document.getElementById(e.target.id)

    a.click()
    pickedProject = this.props.projects.filter(function (project) {
      return project.title === e.target.id
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
            const vals = new Buffer(project.img.data).toString('base64')
            const src = `data:image/jpeg;base64, ${vals}`
            return (
              <a

                href={'#'}
                key={project.title}
                id={project.title}
                className="projects-container__project projects-container__a" >
                <label
                  htmlFor="chex"
                  className="projects-container__label"
                  onClick={this.handleClick.bind(this)}>
                  <img
                    id={project.title}
                    className="projects-container__img"
                    src={src || ''}
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
          return (

            <div className="body">
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
                    src={pickedProject ? pickedProject[0].youtubeLink : null}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen>
                  </iframe>
                </div>
                {/* <h1> Portfolio Page</h1>
            <hr />
            <p className="projects-container__info">Here you will find a variety of projects I have undertaken.</p>
            <hr /> */}
                <div style={{ display: 'grid', position: 'relative' }}>

                  {/* {
                !this.props.isLoading&&
                <div style={{position:"absolute", top:"50%",transform:"translateY(-50%)", marginTop:"-.4rem"}}>
                    <a style={{display:"block"}}className="up"onClick={this.handleClickUp.bind(this)}>
                        <i className="fas fa-chevron-up shift pointer"></i>
                    </a>
                    <a style={{display:"block"}} className="down" onClick={this.handleClickDown.bind(this)}>
                        <i className="fas fa-chevron-down shift pointer scale"></i>
                    </a>
                </div>
                } */}
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
                    <Description pickedProject={pickedProject}/>
                  </div>
                </div>
              </div>

            </div>)
        }
}

function mapStateToProps (state) {
  return {
    isLoading: state.ui.isLoading,
    projects: state.projects
  }
}

export default connect(mapStateToProps)(Portfolio)
