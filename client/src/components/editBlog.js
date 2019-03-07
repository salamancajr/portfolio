import React, {Component} from "react";
import {patchItem} from "../actions"
import {connect} from "react-redux";

class EditBlog extends Component{

    constructor(props){
        super(props);
        this.state ={
            text:"",
            title:"",
            description:"",
            link:"",
            githubLink:"",
            option:"text",
            orderNum:"",
        }
    }

    componentWillReceiveProps(nextProps) {
            let orderNum = null;
            if(nextProps.selectedBlog.orderNum){
                orderNum = nextProps.selectedBlog.orderNum
            }
            else{
                orderNum =""
            }

        if (nextProps.name==="blog"){
            this.setState({
                text:nextProps.selectedBlog.text,
                title:nextProps.selectedBlog.title,
                orderNum
            });
        }

        else{
            this.setState({
                description:nextProps.selectedProject["description"],
                title:nextProps.selectedProject.title,
                githubLink:nextProps.selectedProject.githubLink,
                link:nextProps.selectedProject.link
            });
        }
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.patchItem(e);
    }

    render(){
         return (

            <div className="">
                <input type="checkbox"className="blogListCheck" id="blogListCheck"/>
                <div className="patchForm">
                <label className="patchForm__exit pointer" htmlFor="blogListCheck">&#10006;</label>
                    <form
                        onSubmit={this.handleSubmit.bind(this)}
                        id={this.props.name+"Form"}
                        name={this.props.item}
                    >
                        <select onChange={(e)=>{this.setState({option:e.target.value})}}id="updatedBlog" name="updateBlog">
                            <option value="title">Title</option>
                            <option value="text">Text</option>
                            <option value="orderNum">Order Number</option>
                            <option value="description">Description</option>
                            <option value="link">link</option>
                            <option value="githubLink">Github Link</option>
                            <option value="youtubeLink">Youtube Link</option>
                        </select>
                        <textarea onChange={(e)=>{this.setState({[this.state.option]:e.target.value})}}id="area"name="text" rows="10" cols="50" value={this.state[this.state.option]}></textarea>
                        <input type="submit"/>
                </form>
            </div>
            </div>
            )
        }
    }
function mapStateToProps(state){
    return{
    selectedBlog:state.selectedBlog,
    selectedProject:state.selectedProject
    }
}
export default connect(mapStateToProps, {patchItem})(EditBlog)

