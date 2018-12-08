import React, {Component} from "react";
import Navbar from "./navbar";
import {fetchBlog, patchItem, selectedBlog} from "../actions";
import {connect} from "react-redux";
import _ from "lodash";
import Loading from './Loading';

class Blog extends Component{
    state={
        isLoaded:false
    }
    componentDidMount(){
        this.props.fetchBlog(()=>this.setState({isLoaded:true}));
    }

    goToBlog(e){
         
        let prom = new Promise((resolve, reject)=>{
            resolve(this.props.selectedBlog(e.target.id))
        })
        
        prom.then(()=>{
            this.props.history.push("/BlogEntry")
        })   
       
    } 

    handleClickLike(e){
        this.props.patchItem(e)
    }

    renderBlogs(){
    //try{
        return _.map(this.props.blog, blog=>{
            var subString = blog.text.substr(0, 200)+"...";


            let src =`data:image/jpeg;base64, ${new Buffer(blog.img.data).toString('base64')}`

            return (
                    <div key={blog._id} className="blog-entry">
                        <div className="blog-entry__header">
                            <div className="blog-entry__header--column-1">

                                <h3 id={blog._id} onClick={this.goToBlog.bind(this)}>{blog.title}</h3>

                                <span className="blog-entry__time">Created {blog.time?blog.time:""}</span>
                            </div>
                            <div className="blog-entry__header--column-2">
                                <div id={blog._id} className="blog-entry__icon">
                                    <i id={blog._id} className="fas fa-star pointer star" onClick={this.handleClickLike.bind(this)}></i>
                                    <span>{blog.likes.length}</span>
                                </div>
                                <div className="blog-entry__icon">

                                    <a href={`https://twitter.com/intent/tweet?text=Visit https://www.georgesalamanca.com/BlogEntry?${blog._id} to read more about ${blog.title}`} target="_blank">
                                        <i className="fas fa-share pointer share" style={{color:"blue"}}></i>
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
    // }
    //     catch(e){
    //         return <div style={{color:"blue", width:"100vw", height:"100vh"}}></div>
    //     }
    }

render(){
    return (
        <div className="blog-body" style={this.state.isLoaded?null:{width:"100vw", height:"100vh" }}>
            {this.state.isLoaded?

            this.renderBlogs()
        :
            <Loading/>}

             <Navbar />
        </div>);
    }
}

function mapStateToProps(state){
    return{
    blog: state.blog
    };

}

export default connect(mapStateToProps, {fetchBlog, patchItem, selectedBlog})(Blog);