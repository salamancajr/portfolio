import React from 'react'
import { Link } from 'react-router-dom'

export default ({ name }) => {
  const { pathname } = window.location

  return (
    <li className="nav-item">
      <Link
        className="nav-link"
        style={
          pathname === `/${name}`
            ? { color: 'white' }
            : pathname === '/Login' && name === 'Admin'
              ? { color: 'white' }
              : (pathname === '/BlogEntry' || /SelectedBlog/.test(pathname)) && name === 'Blog'
                ? { color: 'white' }
                : pathname === '/' && name === 'Home' ? { color: 'white' } : null
        }
        to={`/${name}`}>
        {name}
      </Link>
    </li>
  )
}
