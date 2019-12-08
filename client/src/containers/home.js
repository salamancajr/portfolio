import React, {Component} from 'react';
import Navbar from "../components/navbar"
export default class App extends Component {
  state = {
    boxText: ''
  }
  render() {


    return (
      <div className="body" style={{minHeight:"500px"}}>
        <Navbar title="Home | George Salamanca"/>
        <div className="body__container-row">
          {/* <div className="column-1"></div>
          <div className="column-2" style={{overflow:'visible'}}> */}
          <div class="card" style={{maxWidth: '36rem', padding: '2rem'}}>

  <div class="card-body text-dark">
    <h5 class="card-title">Welcome to my developer page.</h5>
    <p class="card-text">You'll find a little info about me. You can see some of my projects and find my contact information. Enjoy!.</p>
  </div>
</div>
            {/* <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              fill="purple" transform="scale(1,-1)" width="1000" height="1000" viewBox="0 0 20000 600"
              preserveAspectRatio="xMidYMid meet">
              <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <path  d="M5920 4941 c-674 -3 -1233 -10 -1243 -15 -10 -4 -21 -16 -25 -25 -4
              -9 -5 -522 -2 -1141 3 -619 6 -2206 8 -3527 1 -1451 6 -2412 11 -2427 6 -13
              16 -28 23 -32 9 -6 6 -10 -10 -14 -18 -4 -79 -106 -293 -490 -149 -267 -293
              -528 -321 -580 -28 -52 -123 -220 -210 -375 -88 -154 -174 -304 -190 -333 -29
              -52 -30 -56 -26 -160 5 -125 22 -169 77 -200 20 -11 46 -34 58 -50 14 -19 42
              -37 75 -49 51 -17 252 -18 6178 -18 l6125 0 74 22 c77 23 88 30 133 78 55 58
              71 102 76 206 3 80 1 104 -15 140 -24 53 -127 227 -234 394 -87 136 -569 917
              -755 1222 -121 198 -123 203 -109 230 13 24 15 469 15 3433 0 2335 3 3441 11
              3519 12 130 8 154 -25 177 -22 14 -405 16 -4103 18 -2243 2 -4629 0 -5303 -3z
              m8930 -3531 l0 -2740 -4880 0 -4880 0 0 2740 0 2740 4880 0 4880 0 0 -2740z"></path>
            </svg> */}
{/* <div style={{width:488, height:274, transform: 'translate(-.2%, -21%)', backgroundColor:'white', position:'absolute', fontFamily:'monotype'}}>
  <div style={{fontSize:27, alignSelf:'center', flex:1, fontFamily:'Andale Mono, monospace'}}>
  {boxText}

  </div>
</div>
          </div> */}
          {/* <div className="column-3"></div> */}
          {/* <div className="column-4">
            <a className="column-4__button"href="https://www.linkedin.com/in/george-salamanca-514b5084/" target="_blank" rel="noopener noreferrer">
              <strong>LinkedIn</strong>
              <i className="fab fa-linkedin-square"></i>
            </a>
            <a className="column-4__button"href="https://www.facebook.com/george.salamanca.9" target="_blank" rel="noopener noreferrer">
              <strong>Facebook</strong>
              <i className="fab fa-facebook"></i>
            </a>
            <a className="column-4__button" href="https://github.com/salamancajr" target="_blank" rel="noopener noreferrer">
              <strong>Github</strong>
              <i className="fab fa-github"></i>
            </a>*/}
          {/* </div> */}
        </div>
      </div>
    );
  }
}