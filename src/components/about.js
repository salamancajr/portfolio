import React from 'react';
import Navbar from "./navbar";
export default function (){
    return (<div className="body">
    <Navbar />
    <input type="checkbox" id="about" className="about_check"/>
   <div className="body__container-column body__container-column--about-me">

      <img id="selfie" src="https://i1283.photobucket.com/albums/a550/George_Salamanca/IMG_E2155_zpsncvpbfwi.jpg" alt="Selfie"/>

      <h1>
       About me
     </h1>

    <p>I was born and raised in NY. I started coding in 2017 by following the coursework at
      <a style={{color: "orange"}} href="https://www.freecodecamp.org/salamancajr" target="_blank" rel="noopener noreferrer"> Free Code Camp.</a> I obtained their certificate in front end development and am current working on projects for their
      data visualization certificate and back-end development certificate. Thus far, I have learned about Javascript, jQuery,
      CSS, HTML and React. I enjoy it so much that I am decidedly pursuing a career in software development. I am also exploring
      other courses at Codecademy and Udemy to learn more about Javascript, React, Redux and Python.</p>
      </div>
         <div className="body__container-column body__container-column--about-page">

      <h1>
       About this webpage
     </h1>

    <p>This web app was created using react, redux and react-router. The layout design of each
    route was configured using flexbox and css grid. There was no bootstrap or UI frameworks used to create this  other than for the navigation bar.
    SCSS was used to compile the CSS code for this project. All of the blogs in the blog route and the projects in the
    portfolio route are fetched from an API created with node.js and express that can be viewed
    <a href="https://quiet-taiga-43727.herokuapp.com/api" target="_blank"rel="noopener noreferrer"> here</ a>. Because all the images were saved
    as binary code, it may take a minute or two for the link to load and a JSON viewer extension is strongly recommended
    if you will be visiting this link. Testing of
    the different GET, POST, PATCH and DELETE routes was programmed using mocha.js. MongoDB was selected as the database to store all API data, from
    blog content to portfolio jpeg files. The administrator authentication was created using a few NPM modules, namely JWT and...I created this page with the
    intention of incorporating as much as I could of what I have learned so far.</p>
    </div>
    <label htmlFor="about">
        <div className="admin-login" id="about-button" onClick={(e)=>{e.target.innerHTML==="About this page"?e.target.innerHTML="About me":e.target.innerHTML="About this page"}}>

                About this page

        </div>
        </label>

  </div>)
}