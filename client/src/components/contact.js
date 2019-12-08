import React from 'react';
import Navbar from './navbar';

export default function (){
return(
<div className="body" style={{alignItems:'center', justifyContent:'center'}}>
<Navbar title="Contact Me"/>
{/* <div className="body__container-column contact"> */}
<div class="card"  style={{maxWidth: '36rem', padding: '2rem', alignSelf:'center'}}>
  <div class="card-body">

    <p class="card-text">You can contact me by email at
    <a href="mailto: salamancajr@gmail.com"> salamancajr@gmail.com</a> or through any of the following social sites.</p>
    <a href="https://www.linkedin.com/in/george-salamanca-514b5084/" class="card-link">LinkedIn</a>
    <a href="https://www.facebook.com/george.salamanca.9" class="card-link">Facebook</a>
    <a href="https://github.com/salamancajr" class="card-link">Github</a>
  </div>
</div>
  {/* <h2 className="contact">Contact

  </h2> */}
  {/* <p className="contact" id="contactP">You can contact me by email at
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
    </a> */}

  {/* </div> */}
</div>
// </div>

)
}