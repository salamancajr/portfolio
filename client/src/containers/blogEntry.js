import React, {Component} from "react";
import {selectedBlog} from "../actions";
import Navbar from "../components/navbar"
import {connect} from "react-redux";
import marked from "marked";

var selected="";
let vals="";
let src="";
class BlogEntry extends Component{

    componentWillMount(){
        console.log("heyhey")
    }
    componentDidMount(){

        if (window.location.search.slice(1)){
          this.props.selectedBlog(window.location.search.slice(1), ()=>{console.log("done")})

        }
        else{
            // if(this.props.selectBlog=={}){
            //     this.props.history.push("/Blog")
            // }
            // if(!this.props.selectBlog.img){
            //     this.props.history.push("/Blog")

            // }
            try{
                console.log(this.props.selectBlog.img)
                if(this.props.selectBlog.img==undefined){
                    this.props.history.push("/Blog")
                }
            }
            catch(e){
                this.props.history.push("/Blog")
            }
            // if(this.props.selectBlog.length==undefined){
            //     this.props.history.push("/Blog")
            // }
        }


   }
//     static getDerivedStateFromProps(nextProps){
//         console.log(nextProps)
//     }
//    componentDidUpdate(prevProps){
//         console.log(prevProps)
//    }

    render(){
        try{
            selected = this.props.selectBlog;
            vals = new Buffer(selected.img.data).toString('base64');
            src = `data:image/jpeg;base64, ${vals}`;

            return (
                <div className="blog-body">
                    <div className="blog-story">
                        <h2 className=" blog-story__heading">{selected.title?selected.title:""}</h2>
                        <div style={{background:"purple"}}>
                            <img className=" blog-story__img" src={src?src:""} alt={selected.title}/>
                        </div >
                        <span className="blog-story__time">{selected.time}</span>
                        <div className="blog-story__text" dangerouslySetInnerHTML={{__html: marked(selected.text)}}>
                        </div>
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

    return {
        selectBlog:state.selectedBlog
    };
}
export default connect(mapStateToProps, {selectedBlog})(BlogEntry)