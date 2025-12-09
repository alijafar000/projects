

import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX } from "react-icons/fi";

const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [window.location.pathname]);

  // Close menu on escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, []);

  // Add/remove body class for scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  return (
    <header>
      <div className='container'>
        <div className='grid navbar-grid'>
          <div className='Logo'>
            <h1>WorldAtlas</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className='menu-web'>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to='/about'>About</NavLink>
              </li>
              <li>
                <NavLink to='country'>Country</NavLink>
              </li>
              <li>
                <NavLink to='/contact'>Contact</NavLink>
              </li>
            </ul>
          </nav>

          {/* Hamburger Menu Icon */}
          <button className={`ham-menu ${isMenuOpen ? 'rotate' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <FiX size={28} />
            ) : (
              <FiMenu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu with Overlay */}
        {isMenuOpen && (
          <div 
            className="menu-overlay active" 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
        
        <div className={`menu-mobile ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/about' onClick={closeMenu}>About</NavLink>
            </li>
            <li>
              <NavLink to='country' onClick={closeMenu}>Country</NavLink>
            </li>
            <li>
              <NavLink to='/contact' onClick={closeMenu}>Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Headers