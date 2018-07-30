import React, {Component} from "react";
// import {selectedBlog} from "../actions";
import Navbar from "./navbar"
import {connect} from "react-redux";
import marked from "marked";

var selected="";
let vals="";
let src="";
class BlogEntry extends Component{

    componentWillMount(){
        try{console.log(this.props.selectedBlog.img.data==="")}
        catch(e){this.props.history.push("/Blog")}

    }
    render(){
        try{
            selected = this.props.selectedBlog;
            vals = new Buffer(selected.img.data).toString('base64'),
            src = `data:image/jpeg;base64, ${vals}`;

            return (
                <div className="blog-body">

                <div className="blog-story">
                    <h2 className=" blog-story__heading">{selected.title?selected.title:""}</h2>
                    <div style={{background:"purple"}}>
                    <img className=" blog-story__img" src={src?src:""}/>
                    </div >
                    <div className=" blog-story__text" dangerouslySetInnerHTML={{__html: marked(selected.text)}}>
                    </div>
                    {/* <p className=" blog-story__text">{selected.text}</p> */}
                    {/* <div className=" blog-story__text" id="content"> */}
                    {/* {selected.text} */}
                    {/* {marked('# Marked in the browser\n\nRendered by **marked**.')} */}
                    {/* </div> */}
                </div>
                <Navbar/>
                </div>
                );
        }
        catch(e){
            return <div>Loading...</div>

        }

    }
}
function mapStateToProps(state){
    console.log(state.selectedBlog);

    return {
        selectedBlog:state.selectedBlog
    };
}
export default connect(mapStateToProps, {})(BlogEntry)