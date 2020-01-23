import React, { useState } from 'react'
import Navbar from './navbar'
export default () => {
  const [title, setTitle] = useState('About Me')

  return (
    <div className="body">
      <Navbar {...{ title }}/>
      <input type="checkbox" id="about" className="about_check"/>
      <div className="body__container-column body__container-column--about-me">
        <div class="card" style={{ width: '30rem', justifyContent: 'center' }}>
          <img style={{ height: '20rem', objectFit: 'cover' }} src="https://portfoliogs.s3.amazonaws.com/17352347_10158395309945298_4196410004585528038_n.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text" style={{ padding: '1.5rem' }}>I was born and raised in NY. I started coding in 2017 by following the coursework at
              <a style={{ color: 'orange' }} href="https://www.freecodecamp.org/salamancajr" target="_blank" rel="noopener noreferrer"> Free Code Camp.</a> I obtained their certificate in front end development and am current working on projects for their
              data visualization certificate and back-end development certificate. Thus far, I have learned about Javascript, jQuery,
            CSS, HTML and React. I enjoy it so much that I am decidedly pursuing a career in software development. I am also exploring
            other courses at Codecademy and Udemy to learn more about Javascript, React, Redux and Python.</p>
           </div>
        </div>
      </div>
    </div>)
}
