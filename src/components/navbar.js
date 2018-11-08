import React from 'react'
import {Link} from 'react-router-dom';


export default function (){
    return(
    <nav className="ml-auto navbar navbar-expand-sm navbar-dark rounded-0 navy">
        <div className="ml-auto container">
            <h1 className="navbar-brand" style={{opacity:window.location.pathname==="/"?0:1}}href="#">George's Web Developer Page</h1>
            <div className="ml-auto">
                <button className="ml-auto navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                    Menu
                </button>
            </div>
            <div className="ml-auto collapse navbar-collapse" id="navbarNav">
                <ul className=" ml-auto navbar-nav">
                    <li className="nav-item">
                        <Link className = "nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" to="/About">
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Portfolio">Portfolio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Contact">
                            Contact
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Blog">
                            Blog
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                        Admin
                    </Link>
                    </li>
                 </ul>
            </div>
        </div>
    </nav>)
}