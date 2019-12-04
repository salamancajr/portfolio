import React from 'react'
import NavItem from './NavItem';

export default function ({ title }){
    return(
    <nav className="ml-auto navbar navbar-expand-sm navbar-dark rounded-0 navy">
        <div className="ml-auto container">
            <h1 className="navbar-brand" href="#">{title}</h1>
            <div className="ml-auto">
                <button className="ml-auto navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                    Menu
                </button>
            </div>
            <div className="ml-auto collapse navbar-collapse" id="navbarNav">
                <ul className=" ml-auto navbar-nav">
                    <NavItem name="Home" />
                    <NavItem name="About" />
                    <NavItem name="Portfolio" />
                    <NavItem name="Contact" />
                    <NavItem name="Blog" />
                    <NavItem name="Admin" />
                 </ul>
            </div>
        </div>
    </nav>)
}