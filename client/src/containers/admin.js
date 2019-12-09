import React, { Component } from 'react';
import LogoutButton from "../components/logoutButton";
import Navbar from "../components/navbar";
import {handleAdminChart, authenticateRoute, adminLogout } from "../actions";
import {fetchBlog} from "../sagas/blogSagas";
import {fetchProjects} from "../actions";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import ProjectList from "../components/admin-project-list";
import BlogList from "../components/admin-blog-list";
import EditBlog from "../components/editBlog";
import Loading from "../components/Loading";

class Admin extends Component {
    state={
        isLoadedProjects:false,
        isLoadedBlog:false
    }
    componentWillMount(){
       this.props.authenticateRoute(()=>
            this.props.history.push("/login"))
    }

    componentDidMount(){
        fetchProjects(()=>this.setState({isLoadedProjects:true}));
        fetchBlog();
        this.setState({isLoadedBlog:true})
    }

    handle2ndClick(){
        this.props.adminLogout(()=>{this.props.history.push("/Login")})
    }


    render(){
        return (
            <div className="body">
                <Navbar title="Admin Page" />
                <div className="body__container-portfolio">
                {this.state.isLoadedBlog && this.state.isLoadedProjects?
                    <table
                        id="fetchTable"
                        className="projects-table">
                        <thead
                            className="projects-table__head">
                            <tr>
                                <th>
                                    <span
                                        className="pointer"
                                        style={{color:this.props.adminChart==="blog"?"#007bff":""}} id="projects"
                                        onClick={(e)=>this.props.handleAdminChart(e)}>Projects
                                    </span>
                                    /
                                    <span
                                        className="pointer"
                                        style={{color:this.props.adminChart==="projects"?"#007bff":""}}id="blog"
                                        onClick={(e)=>this.props.handleAdminChart(e)}>Blog
                                    </span>
                                    {this.props.adminChart==="blog"?
                                    <Link
                                        style={{float:"right"}}
                                        to="/NewBlogEntry">
                                        <i className="fas fa-plus"></i>
                                    </Link>
                                    :
                                    <Link
                                        style={{float:"right"}}
                                        to="/NewProject">
                                        <i className="fas fa-plus"></i>
                                    </Link>}
                                </th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {this.props.adminChart==="blog"?
                        <BlogList
                            blog={this.props.blog}
                            link={this.props.history}/>
                            :
                        <ProjectList
                            projects={this.props.projects}
                            link={this.props.history.push}/>
                        }

                    </table>
                    :
                    <Loading/>
                    }
                    <EditBlog
                        name={this.props.adminChart}
                        item={this.props.adminChart==="blog"?this.props.selectedBlog._id:this.props.selectedProject._id}
                    />

                </div>
                <LogoutButton logout={this.handle2ndClick.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps(state){


    return {
        selectedBlog:state.selectedBlog,
        blog:state.blog,
        projects:state.projects,
        adminChart:state.adminChart,
        editName:state.editName,
        selectedProject:state.selectedProject
    };
}

export default connect(mapStateToProps, {fetchProjects, fetchBlog, handleAdminChart, authenticateRoute, adminLogout})(Admin);