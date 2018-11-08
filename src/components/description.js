import React, { Component } from 'react';
import _ from "lodash";
let link;
let title;
let githubLink;
let text;
let img;
let vals;
let src;
export default class Description extends Component {

 handleChecks(){

  var inputs= document.getElementsByTagName("input");

   _.map(inputs, function(input){

       input.checked = "";
   });
 }

 handleClick=()=>{
    let iframe = document.querySelector(".iframe__container")
    iframe.style.display="block"
 }
render(){

        try{
        vals = new Buffer(this.props.pickedProject[0].img.data).toString('base64');
        src = `data:image/jpeg;base64, ${vals}`;
        link = this.props.pickedProject[0].link;
        githubLink = this.props.pickedProject[0].githubLink;
        title = this.props.pickedProject[0].title;
        text = this.props.pickedProject[0].description;

     }

        catch(e){
            githubLink="";
            link="";
            title="";
            text="";
            img="";
        }

    return (

        <div className="description-box">

            <i
                onClick={this.handleChecks.bind(this)}className="fas fa-angle-double-right description-box__arrow"></i>
            <div className="description-box__img-container">
                <label onClick={this.handleClick} htmlFor="description__checkbox">
                <i className="fas fa-play-circle pointer scale"></i>
                <img src={src?src:""} alt={title} className="pointer"/>
                </label>
            </div>
            <div className="description-box__text">
                <h3>{title}</h3>

                <p>{text}</p>
            </div>
            <div className="description-box__icons-container">
            <a href={githubLink} target="_blank">
            <i className="fab fa-github"></i></a>
            <a href={link} target="_blank"> <i className="fas fa-external-link-square-alt"></i></a>
            </div>
        </div>

    );
}
}


