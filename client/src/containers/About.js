import React from 'react'
import Navbar from '../components/Navbar'
export default () => {
  return (
    <div className="body">
      <Navbar title="About Me" />
      <input type="checkbox" id="about" className="about_check"/>
      <div className="body__container-column body__container-column--about-me">
        <div class="card" style={{ width: '60rem', justifyContent: 'center', flexDirection: 'row' }}>
          <img style={{ width: '30rem', objectFit: 'cover' }} src="https://portfoliogs.s3.amazonaws.com/17352347_10158395309945298_4196410004585528038_n.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text" style={{ padding: '1.5rem' }}>I was born and raised in NY. I started coding in 2017 by following the coursework at
              <a style={{ color: 'orange' }} href="https://www.freecodecamp.org/salamancajr" target="_blank" rel="noopener noreferrer"> Free Code Camp.</a> I obtained their certificate in front end development, data visualization and back-end development.
              I enjoyed it so much so that I dedicated myself to coding ever since. Experienced and passionate FullStack developer with over two years of experience with Javascript, NodeJS, React, React-Native, and MongoDB.

I am eager to work on you project and provide a quality, professional experience from start to finish. Please contact me to discuss your position and how I can meet your business needs!</p>
          </div>
        </div>
      </div>
    </div>)
}
