import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteBlog, selectedBlog} from "../actions";
import Sortable from "react-sortablejs";
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

            return (
                <tr key={blog._id}>
                    <th>{blog.title}</th>
                    <th>
                        <label  htmlFor="blogListCheck">
                            <i
                            name={blog.title}
                            id={blog._id}
                            onClick={this.handleClick.bind(this)}
                            className="fas fa-edit pointer" >
                            </i>
                        </label>
                    </th>
                    <th>
                        <i
                            id={blog._id}
                            onClick={()=>document.getElementById(`warning${blog._id}`).style.display = "block"}
                            className="fas fa-trash pointer">
                        </i>
                    </th>
                    <th id={`warning${blog._id}`} className="warning">
                        <h3>
                            Are you sure you want to delete <span className="warning__span">{blog.title}?</span>
                        </h3>
                        <button
                            id={blog._id}
                            onClick={this.callToDelete.bind(this)}
                            className="warning__button pointer">
                            Delete
                        </button>
                        <button onClick={()=>document.getElementById(`warning${blog._id}`).style.display = "none"} className="warning__button pointer">
                            Cancel
                        </button>
                    </th>
                </tr>
            );
        });
    }

    render(){
    return(
        <Sortable tag="tbody" className="projects-table__body">
            {this.renderBlogList()}
        </Sortable>
        );
    }
}

function mapStateToProps(state){
     return{
        blog:state.blog
    }
}
export default connect(mapStateToProps, {deleteBlog, selectedBlog})(BlogList)