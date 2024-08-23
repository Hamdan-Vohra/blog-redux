import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'

const Header = ({title}) => {
  return (
    <header className='Header'>
            <Link to="/" className='heading'><h1>{title}</h1></Link>
            <Nav/>
    </header>
  )
}

export default Header