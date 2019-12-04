import React from 'react';
import Navbar from './navbar';

export default function (){
return(
<div className="body">
<Navbar title="Contact Me"/>
<div className="body__container-column contact">

  {/* <h2 className="contact">Contact

  </h2> */}
  <p className="contact" id="contactP">You can contact me by email at
    <a href="mailto: salamancajr@gmail.com"> salamancajr@gmail.com</a> or through any of the following social sites.</p>
<hr />
<div className="contact btc-group">

    <a className="btc" href="https://www.linkedin.com/in/george-salamanca-514b5084/" target="_blank" rel="noopener noreferrer">

      <i className="fab fa-linkedin-square"></i>
    </a>


      <a className="btc" href="https://www.facebook.com/george.salamanca.9" target="_blank" rel="noopener noreferrer">

    <i className="fab fa-facebook"></i>
    </a>


    <a className="btc" href="https://github.com/salamancajr" target="_blank" rel="noopener noreferrer">
      <strong></strong>
      <i className="fab fa-github"></i>
    </a>

  </div>
</div>
</div>

)
}