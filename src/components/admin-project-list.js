import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteProject, handleEdit, selectedProject} from "../actions";
import {Link} from "react-router-dom";
import _ from "lodash";

class ProjectList extends Component{

callToDeleteProject(e){

    this.props.deleteProject(e.target.id)
}

    renderProjectList(e){
        return _.map(this.props.projects, project=>{
            console.log("projectingBaby", project._id);

            return (
                <tr>
                    <th>{project.title}</th>
                    <th

                    >
                        <label

                        htmlFor="blogListCheck">
                            <i
                            name={project.title}
                            id={project.title}
                            onClick={(e)=>this.props.selectedProject(e.target.id, ()=>{console.log("testing")})}
                            className="fas fa-edit pointer"
                            ></i>
                        </label>

                    </th>
                    <th>
                        <i
                        id={project._id}
                        onClick={(this.callToDeleteProject.bind(this))}
                        className="fas fa-trash pointer">
                        </i>
                    </th>
                </tr>
            );
        });
    }

    render(){
    return(
        <tbody className="projects-table__body">
            {this.renderProjectList()}
        </tbody>
        );
    }
}

function mapStateToProps(state){
    return{
        projects:state.projects
    }
}
export default connect(mapStateToProps, {deleteProject, selectedProject})(ProjectList)