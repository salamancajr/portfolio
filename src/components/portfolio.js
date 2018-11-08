import React, { Component } from 'react';
import Navbar from "./navbar";
import Description from "./description";
 import _ from 'lodash';
import {fetchProjects } from "../actions";
import {connect} from 'react-redux';
import Loading from './Loading'
let pickedProject;

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            shift:0,
            isLoaded:false
        }
    }

    componentDidMount(){
        this.props.fetchProjects(()=>this.setState({isLoaded:true}));}

    handleClick(e){
        var a = document.getElementById(e.target.id);

        a.click();
        pickedProject = this.props.projects.filter(function(project){
            return project.title === e.target.id;
        });
    }

    handleClickDown(){
        var a = document.getElementsByClassName("projects-container__project");
        var b = document.getElementsByClassName("projects-container")[0];


        _.map(a, (project)=>{

            this.setState({

                shift:this.state.shift-b.offsetHeight
            }, ()=>{
                project.style.top = +this.state.shift+"px"
             })


        });
    }
        handleClickUp(){
        var a = document.getElementsByClassName("projects-container__project");
        var b = document.getElementsByClassName("projects-container")[0];
        if(this.state.shift!==0){
        _.map(a, (project)=>{

            this.setState({

                shift:this.state.shift+b.offsetHeight
            }, ()=>{project.style.top = +this.state.shift+"px"})



        });
        }
    }
        handleClickExitVideo=()=>{
            let iframe = document.querySelector(".iframe__container")
            iframe.style.display="none"
        }

    renderProjects(){

        return _.map(this.props.projects, project=>{
            let vals = new Buffer(project.img.data).toString('base64');
            let src =`data:image/jpeg;base64, ${vals}`;
            return (
                <a

                    href={"#"}
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
                            src={src?src:""}
                            alt={project.title}/>
                        <h3
                            id={project.title}
                            className="projects-container__heading-tertiary">
                            {project.title}
                        </h3>
                    </label>
                 </a>
            );
        });

    }


    render(){


    return (

    <div className="body">
        <Navbar />

            <div className="body__container-portfolio">

            <div className="iframe__container">
            <label  htmlFor="description__checkbox">
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
                    height="240" src={pickedProject?pickedProject[0].youtubeLink:null} frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen>
                </iframe>
            </div>
                <h1> Portfolio Page</h1>
                <hr />
                <p>Here you will find a variety of projects I have undertaken.</p>
                <hr />
                <a className="up"onClick={this.handleClickUp.bind(this)}><i className="fas fa-chevron-up shift pointer"></i></a>
                    <div className="projects-container">
                        <input
                            type="checkbox" className="projects-container__checkbox"
                            id="chex" />
                        {
                            this.state.isLoaded?

                        this.renderProjects()
                    :
                    <Loading/>
                        }
                        <Description pickedProject={pickedProject}/>
                    </div>
                <a className="down" onClick={this.handleClickDown.bind(this)}><i className="fas fa-chevron-down shift pointer scale"></i></a>
            </div>
    </div>);
}
}

function mapStateToProps(state){

    return {projects:state.projects};
}

export default connect(mapStateToProps, {fetchProjects})(Portfolio);