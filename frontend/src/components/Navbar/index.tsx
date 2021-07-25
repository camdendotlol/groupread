import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginButton from './LoginButton'
import GroupDropdown from './GroupDropdown'
import Logo from '../common/Logo'

const Navbar: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [styles, setStyles] = useState('navbar has-shadow is-fixed-top navbar-hidden')

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  const location = useLocation()

  // Hide the navbar when the user is at the top of the homepage,
  // but it should be visible in every other situation
  useEffect(() => {
    if (location.pathname === '/' && !scrolled) {
      setStyles('navbar has-shadow is-fixed-top navbar-hidden')
    } else {
      setStyles('navbar has-shadow is-fixed-top')
    }
  }, [scrolled, location.pathname])

  window.addEventListener('scroll', handleScroll)

  const checkIfActive = (base: string) => {
    return menuVisible
      ? `${base} is-active`
      : base
  }

  return (
    <nav id='navbar' className={styles} role='navigation' aria-label='main navigation'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link id='nav-home-link' className='navbar-item' to='/'>
            <Logo size={'26px'} />
            &nbsp;
            Home
          </Link>
          <GroupDropdown />
          <a role='button' className={checkIfActive('navbar-burger')} onClick={() => setMenuVisible(!menuVisible)} aria-label='menu' aria-expanded='false' data-target='navMenu'>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={checkIfActive('navbar-menu')} id='navMenu'>
          <div className='navbar-end'>
            <LoginButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar