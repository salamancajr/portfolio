import React, { Component } from 'react';
import Navbar from "./navbar";
import Description from "./description";
import _ from 'lodash';
import {fetchProjects } from "../actions";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

let pickedProject;

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            down:0,
            up:0
        }
    }

    componentDidMount(){
        this.props.fetchProjects();}

    handleClick(e){
        var a = document.getElementById(e.target.id);

        a.click();
        pickedProject = this.props.projects.filter(function(project){
            return project.title === e.target.id;
        });
    }

    handleClick2(){
        var a = document.getElementsByClassName("projects-container__project");
        var b = document.getElementsByClassName("projects-container")[0];
        console.log("grid",b);

        _.map(a, (project)=>{
            console.log(project.scrollHeight);

            this.setState({

                up:this.state.up-b.offsetHeight
            }, ()=>{project.style.top = +this.state.up+"px"})


        });
    }
        handleClick3(){
        var a = document.getElementsByClassName("projects-container__project");
        var b = document.getElementsByClassName("projects-container")[0];

        _.map(a, (project)=>{
            this.setState({

                up:this.state.up+b.offsetHeight
            }, ()=>{project.style.top = +this.state.up+"px"})



        });
    }

    renderProjects(){

        return _.map(this.props.projects, project=>{
            let vals = new Buffer(project.img.data).toString('base64');
            let src =`data:image/jpeg;base64, ${vals}`;
            return (

                <a href={"#"} key={project.title} id={project.title} className="projects-container__project" >
                 <label htmlFor="chex"  className="projects-container__label" onClick={this.handleClick.bind(this)}>
              <img id={project.title} className="projects-container__img" src={src?src:""} alt={project.title}/>
                <h3 id={project.title} className="projects-container__heading-tertiary">
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
            <h1> Portfolio Page</h1>
            <hr />
            <p>Here you will find a variety of projects I have undertaken.</p>
            <hr />
            <a className="up"onClick={this.handleClick3.bind(this)}><i class="fas fa-chevron-up"></i></a>
             <div className="projects-container">
                <input type="checkbox" className="projects-container__checkbox" id="chex" />
                {this.renderProjects()}

                <Description pickedProject={pickedProject}/>





            </div>
            <a className="down" onClick={this.handleClick2.bind(this)}><i class="fas fa-chevron-down"></i></a>
        </div>

    </div>);
}
}

function mapStateToProps(state){

    return {projects:state.projects};
}

export default connect(mapStateToProps, {fetchProjects})(Portfolio);