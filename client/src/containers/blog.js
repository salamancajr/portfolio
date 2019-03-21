import React, {Component} from "react";
import Navbar from "../components/navbar";
import {patchItem, selectedBlog} from "../actions";
import {fetchBlog} from "../sagas/blogSagas";
import {connect} from "react-redux";
import _ from "lodash";
import Loading from '../components/Loading';
import { stat } from "fs";

class Blog extends Component{
    state={
        isLoaded:false
    }
    async componentDidMount(){
        fetchBlog();
        this.setState({isLoaded:true})
        var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
        let ipAddress = await findIP;
        this.ipAddress = ipAddress.toString();
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
        const event = e.target;

        /*Usage example*/
        this.props.patchItem(event, this.ipAddress, ()=>{

        })
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

                                <span className="blog-entry__time">Created {blog.time?blog.time:""}</span>
                            </div>
                            <div className="blog-entry__header--column-2">
                                <div id={blog._id} className="blog-entry__icon">
                                {blog.likes.indexOf(this.ipAddress)===-1?
                                    <i id={blog._id} className="far fa-star pointer" onClick={this.handleClickLike.bind(this)}></i>
                                    :
                                    <i id={blog._id} onClick={this.handleClickLike.bind(this)} class="fas fa-star pointer" style={{color:"purple"}}></i>

                                }
                                    <span>{blog.likes.length}</span>
                                </div>
                                <div className="blog-entry__icon">

                                    <a href={`https://twitter.com/intent/tweet?text=Visit https://www.georgesalamanca.com/BlogEntry?${blog._id} to read more about ${blog.title}`} target="_blank">
                                        <i className="fas fa-share pointer share"></i>
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
        <div className="blog-body" style={this.state.loading?null:{width:"100vw", height:"100vh" }}>
            {this.props.loading?
                <Loading/>
                :
            this.renderBlogs()

            }

             <Navbar />
        </div>);
    }
}

function mapStateToProps(state){
    return{
    blog: state.blog,
    loading:state.ui.isLoading
    };

}

export default connect(mapStateToProps, {fetchBlog, patchItem, selectedBlog})(Blog);