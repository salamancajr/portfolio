import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import Navbar from "./navbar";
import {connect} from "react-redux";
import {addProject, authenticateRoute} from "../actions";




class NewProject extends Component{
    componentWillMount(){
      this.props.authenticateRoute(()=>
            this.props.history.push("/login"))
    }
    renderField(field){
        return (
            <div>
                <label>{field.label}</label>

                <input
                    type={field.type}
                    {...field.input}
                />
                {field.meta.error}
            </div>
        );
    }

    onSubmit(values){

        this.props.addProject(values, ()=>{
            this.props.history.push("/Admin")
        });
    }

    fileChangedHandler(e){
        console.log("new.js", e.target.files[0])
    }

    render(){

        const {handleSubmit} = this.props;
    return (
        <div className="body">
            <Navbar />
            <div className="body__container-column">
                <form
                    id="form"
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                    <Field
                        label="title"
                        name="title"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        label="description"
                        name="description"
                        type="textarea"
                        component={this.renderField}
                    />
                    <Field
                        label="githubLink"
                        name="githubLink"
                        type="text"
                        component={this.renderField}
                    />
                    <Field
                        label="link"
                        name="link"
                        type="text"
                        component={this.renderField}
                    />
                    <label className="admin-login" htmlFor="upload">
                        <i className="fas fa-cloud-upload-alt"></i>
                        upload
                    </label>
                    <input type="file"  onChange ={this.fileChangedHandler} name="" label="upload" id="upload"/>

                    <button className="admin-login"type="submit">Submit</button>
                </form>
            </div>
        </div>);
    }
}

function validate(values){
    const errors = {};

    // if(!values.title || values.title.length<3){
    //     errors.title = "Enter a title that is at least 3 characters"
    // }
    // if(!values.description || values.description.length<3){
    //     errors.title = "Enter a description that is at least 3 characters"
    // }
    // if(!values.link || values.link.length<3){
    //     errors.link = "Enter a link that is at least 3 characters"
    // }

    return errors;
}

export default reduxForm({

    validate,
    form: "NewForm"
})(
    connect(null, {addProject, authenticateRoute})(NewProject)
);