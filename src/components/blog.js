import React, {Component} from "react";
import Navbar from "./navbar";
import {fetchBlog} from "../actions";
import {connect} from "react-redux";
import _ from "lodash";
import {selectedBlog} from "../actions";
import {Link} from 'react-router-dom';

class Blog extends Component{

    componentDidMount(){
        this.props.fetchBlog();
    }

    goToBlog(e){
        console.log("id", e.target.id);

        this.props.selectedBlog(e.target.id, ()=>{
           this.props.history.push("/BlogEntry")
        })
    }

    renderBlogs(){

        return _.map(this.props.blog, blog=>{
            var subString = blog.text.substr(0, 380)+"...";


            let src =`data:image/jpeg;base64, ${new Buffer(blog.img.data).toString('base64')}`
            return (
                    <div  className="blog-entry">
                        <div className="blog-entry__header">
                            <div className="blog-entry__header--column-1">

                                <h3 id={blog._id} onClick={this.goToBlog.bind(this)}>{blog.title}</h3>

                                <span className="blog-entry__time">12:00pm</span>
                            </div>
                            <div className="blog-entry__header--column-2">
                                <div className="blog-entry__icon">
                                    <i className="far fa-star"></i>
                                </div>
                                <div className="blog-entry__icon">

                                    <i className="fas fa-share"></i>
                                </div>
                            </div>
                        </div>

                        <img className="blog-entry__img" src={src}>

                        </img>
                        <div className="blog-entry__snippet">

                                {subString}

                        </div>
                    </div>

            )
        })
    }

render(){
    return (
        <div className="blog-body">


            {this.renderBlogs()}

             <Navbar />
        </div>);
    }
}

function mapStateToProps(state){
    return{
    blog: state.blog
    };

}

export default connect(mapStateToProps, {fetchBlog, selectedBlog})(Blog);