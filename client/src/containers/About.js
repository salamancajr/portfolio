import React from 'react'
import Navbar from '../components/Navbar'
export default () => {
  return (
    <div className="body">
      <Navbar title="About Me" />
 	  <div className="about-me__wrapper">
        <div className="card about-me__card">
          <img src="https://portfoliogs.s3.amazonaws.com/17352347_10158395309945298_4196410004585528038_n.jpg" className="about-me__img" alt="..." />
          <div className="card-body">
            <p className="card-text about-me__text">I was born and raised in NY. I started coding in 2017 by following the coursework at
              <a style={{ color: 'orange' }} href="https://www.freecodecamp.org/salamancajr" target="_blank" rel="noopener noreferrer"> Free Code Camp.</a> I obtained their certificate in front end development, data visualization and back-end development.
              I enjoyed it so much so that I dedicated myself to coding ever since. Experienced and passionate FullStack developer with over two years of experience with Javascript, NodeJS, React, React-Native, and MongoDB.

I am eager to work on your project and provide a quality, professional experience from start to finish. Please contact me to discuss your position and how I can meet your business needs!</p>
          </div>
        </div>
      </div>
    </div>)
}
