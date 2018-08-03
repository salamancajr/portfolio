import React, {Component} from "react";
import Navbar from "./navbar";
import {fetchBlog, likedBlog, selectedBlog} from "../actions";
import {connect} from "react-redux";
import _ from "lodash";

class Blog extends Component{

    componentDidMount(){
        this.props.fetchBlog();
    }

    goToBlog(e){

        this.props.selectedBlog(e.target.id, ()=>{
           this.props.history.push("/BlogEntry")
        })
    }

    handleClickLike(e){
        this.props.likedBlog(e.target.id)
    }

    renderBlogs(){

        return _.map(this.props.blog, blog=>{
            var subString = blog.text.substr(0, 200)+"...";


            let src =`data:image/jpeg;base64, ${new Buffer(blog.img.data).toString('base64')}`
            return (
                    <div key={blog._id} className="blog-entry">
                        <div className="blog-entry__header">
                            <div className="blog-entry__header--column-1">

                                <h3 id={blog._id} onClick={this.goToBlog.bind(this)}>{blog.title}</h3>

                                <span className="blog-entry__time">12:00pm</span>
                            </div>
                            <div className="blog-entry__header--column-2">
                                <div className="blog-entry__icon">
                                    <i id={blog._id} className="far fa-star pointer" onClick={this.handleClickLike.bind(this)}></i>
                                </div>
                                <div className="blog-entry__icon">

                                    <a href={`https://twitter.com/intent/tweet?text=Visit https://www.georgesalamanca.com/BlogEntry?${blog._id} to read more about ${blog.title}`} target="_blank">
                                        <i className="fas fa-share pointer" ></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <img className="blog-entry__img" src={src} alt={blog.title}>

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

export default connect(mapStateToProps, {fetchBlog, likedBlog, selectedBlog})(Blog);