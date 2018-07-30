import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteBlog, selectedBlog} from "../actions"
import _ from "lodash";

class BlogList extends Component{


callToDelete(e){


    this.props.deleteBlog(e.target.id, ()=>{window.location.reload()})
}

handleClick(e){

    this.props.selectedBlog(e.target.id, ()=>{console.log("testing")})
}
    renderBlogList(){
        return _.map(this.props.blog, blog=>{
            console.log("blog", blog);

            return (
                <tr>
                    <th>{blog.title}</th>
                    <th>

                    <label  htmlFor="blogListCheck">
                        <i
                        name={blog.title}
                        id={blog._id}
                        onClick={this.handleClick.bind(this)}
                        className="fas fa-edit pointer" ></i>
                    </label>

                    </th>
                    <th

                    ><i
                    id={blog._id}
                    onClick={this.callToDelete.bind(this)}
                    className="fas fa-trash pointer"></i></th>
                </tr>
            );
        });
    }

    render(){
    return(
        <tbody className="projects-table__body">
            {this.renderBlogList()}
        </tbody>
        );
    }
}

function mapStateToProps(state){
    return{
        blog:state.blog
    }
}
export default connect(mapStateToProps, {deleteBlog, selectedBlog})(BlogList)