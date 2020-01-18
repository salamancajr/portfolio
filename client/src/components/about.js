import React, { useState } from 'react'
import Navbar from './navbar'
export default () => {
  const [title, setTitle] = useState('About Me')

  return (
    <div className="body">
      <Navbar {...{ title }}/>
      <input type="checkbox" id="about" className="about_check"/>
      {/* <div className="body__container-column body__container-column--about-me">
        <img id="selfie" src="https://portfoliogs.s3.amazonaws.com/17352347_10158395309945298_4196410004585528038_n.jpg" alt="Selfie"/>

        <hr />
        <p>I was born and raised in NY. I started coding in 2017 by following the coursework at
          <a style={{ color: 'orange' }} href="https://www.freecodecamp.org/salamancajr" target="_blank" rel="noopener noreferrer"> Free Code Camp.</a> I obtained their certificate in front end development and am current working on projects for their
              data visualization certificate and back-end development certificate. Thus far, I have learned about Javascript, jQuery,
            CSS, HTML and React. I enjoy it so much that I am decidedly pursuing a career in software development. I am also exploring
            other courses at Codecademy and Udemy to learn more about Javascript, React, Redux and Python.</p>
      </div> */}
      <div className="body__container-column body__container-column--about-me">
        <div class="card" style={{ width: '30rem', justifyContent: 'center' }}>
          <img style={{ height: '20rem', objectFit: 'cover' }} src="https://portfoliogs.s3.amazonaws.com/17352347_10158395309945298_4196410004585528038_n.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            {/* <h5 class="card-title">Card title</h5> */}
            <p class="card-text" style={{ padding: '1.5rem' }}>I was born and raised in NY. I started coding in 2017 by following the coursework at
              <a style={{ color: 'orange' }} href="https://www.freecodecamp.org/salamancajr" target="_blank" rel="noopener noreferrer"> Free Code Camp.</a> I obtained their certificate in front end development and am current working on projects for their
              data visualization certificate and back-end development certificate. Thus far, I have learned about Javascript, jQuery,
            CSS, HTML and React. I enjoy it so much that I am decidedly pursuing a career in software development. I am also exploring
            other courses at Codecademy and Udemy to learn more about Javascript, React, Redux and Python.</p>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}><a style={{
              padding: '1rem 4rem 1rem',
              borderRadius: '2rem',
              backgroundColor: 'purple',
              minWidth: '5rem',
              alignSelf: 'center'
            }} href="#" class="btn btn-primary">Contact</a>

            </div> */}

          </div>
        </div>
      </div>
      {/* <div
        className="body__container-column body__container-column--about-page"
      >

        <p>This single page application was created using react, redux and react-router. The layout design of each
    route was configured using flexbox and css grid. I tried to avoid bootstrap and other UI frameworks while creating this page so I could get experience with some advanced css concepts, and excluding the navigation bar that uses bootstrap, I was able to accomplish that.
    SCSS was used to compile the CSS code for this project. It allowed me to organize my css code neatly into different folders and files. All the blog content is parsed with a <a href="https://www.npmjs.com/package/marked" target="_blank"rel="noopener noreferrer">markdown compiler</a> that allows for easier formatting of blog articles with headlines, lists, images, etc. directly from the input field in the admin section. All of the blogs in the blog route and the projects in the
    portfolio route are fetched from an API created with node.js, MongoDB and express that can be viewed
        <a href="https://quiet-taiga-43727.herokuapp.com/api" target="_blank"rel="noopener noreferrer"> here</ a>.  Because all the images were saved
    as binary code, it may take a minute or two for the link to load and a JSON viewer extension is strongly recommended
    if you will be visiting this link. The administrator authentication was created using a few NPM modules, namely <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank"rel="noopener noreferrer">JSONWEBTOKEN</a> and <a href="https://www.npmjs.com/package/bcryptjs" target="_blank"rel="noopener noreferrer">BCRYPTJS.</a> I created this page with the
    intention of incorporating as much as I could of what I have learned so far. It will be useful for posting new projects and blogs. Future additions will include adding functionality to the "likes" and "share" button on the blogs page and adding video functionality so I can upload videos directly from the admin route of the page. Also,testing of
    the different GET, POST, PATCH and DELETE routes will be added in the future and will be programmed using mocha.js.</p>
      </div> */}
      {/* <label htmlFor="about">
        <div
          className="admin-login"
          id="about-button"
          onClick={(e) => {
            if (e.target.innerHTML === 'About Me') {
              e.target.innerHTML = 'About This page'
              setTitle('About Me')
            } else {
              e.target.innerHTML = 'About Me'
              setTitle('About This Page')
            }
          }}>
            About This Page
        </div>
      </label> */}
    </div>)
}
