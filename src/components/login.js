import React, {Component} from "react";
import Navbar from "./navbar";
import {loginAuth} from "../actions";
import {connect} from "react-redux";

class Login extends Component{
    componentWillMount(){
        localStorage.getItem("token")?this.props.history.push("/Admin"):"";
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.loginAuth(()=>this.props.history.push("/Admin"));
    }

    render(){
    return (
        <div className="body">
            <Navbar />
            <div className="body__container-column">
            <form id="loginForm" onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <input type="email" validate="email" name="email" id="email" placeholder="email"/>
                </div>
                <div>
                    <input type="password" validate="password" name="password" id="password" placeholder="password"/>
                </div>
                <input className="admin-login"type="submit"/>
                </form>
            </div>
        </div>);
    }
}

export default connect(null, {loginAuth})(Login);