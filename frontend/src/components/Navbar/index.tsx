import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoggedInButtons from './LoggedInButtons'
import GroupDropdown from './GroupDropdown'
import Logo from '../common/Logo'
import MobileSidebar from './MobileSidebar'
import { NavbarDiv } from './styledcomponents'
import { List } from 'react-bootstrap-icons'

const Navbar: React.FC = () => {
  // Assume the navbar is hidden by default
  // If the user loads straight into a page other than the homepage,
  // we get a nice fade-in effect anyway.
  const [navbarHidden, setNavbarHidden] = useState(true)

  // Determines whether the user has scrolled down from the top.
  const [scrolled, setScrolled] = useState(false)

  // Determines whether the sidebar is visible (only relevant on mobile displays)
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false)

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
      setNavbarHidden(true)
    } else {
      setNavbarHidden(false)
    }
  }, [scrolled, location.pathname])

  window.addEventListener('scroll', handleScroll)

  return (
    <>
      <MobileSidebar
        showSidebar={sidebarVisible}
        setShowSidebar={setSidebarVisible}
      />
      <NavbarDiv
        id='navbar'
        role='navigation'
        aria-label='main navigation'
        className={navbarHidden ? 'hidden' : ''}
      >
        <div className='container'>
          <div className='navbar-brand'>
            <Link
              id='nav-home-link'
              to='/'
            >
              <Logo size={'26px'} />
              &nbsp;
              Home
            </Link>
            <GroupDropdown />
          </div>
          <div className='left-menu'>
            <LoggedInButtons />
          </div>
          <div className='burger'>
            <a
              role='button'
              className='navbar-burger'
              onClick={() => setSidebarVisible(!sidebarVisible)} aria-label='menu' aria-expanded='false' data-target='navMenu'
            >
              <List size={40} />
            </a>
          </div>
        </div>
      </NavbarDiv>
    </>
  )
}

export default Navbar