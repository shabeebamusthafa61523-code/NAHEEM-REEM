import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id) => {
    setOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-logo">
        Reem <span>&</span> Naheem
      </a>

      <button 
        className="hamburger" 
        onClick={() => setOpen(!open)} 
        aria-label="Toggle navigation menu"
      >
        <span style={{ transform: open ? 'rotate(45deg) translateY(7px)' : '' }} />
        <span style={{ opacity: open ? 0 : 1 }} />
        <span style={{ transform: open ? 'rotate(-45deg) translateY(-7px)' : '' }} />
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            Home
          </a>
        </li>
        <li>
          <a href="#details" onClick={(e) => { e.preventDefault(); scrollToSection('details'); }}>
            Details
          </a>
        </li>
        <li>
          <a href="#schedule" onClick={(e) => { e.preventDefault(); scrollToSection('schedule'); }}>
            Schedule
          </a>
        </li>
        <li>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>
            Gallery
          </a>
        </li>
        <li>
          <a href="#wishes" onClick={(e) => { e.preventDefault(); scrollToSection('wishes'); }}>
            Wishes Wall 💬
          </a>
        </li>
        <li>
          <a href="#rsvp" className="nav-rsvp-btn" onClick={(e) => { e.preventDefault(); scrollToSection('rsvp'); }}>
            RSVP Now 💌
          </a>
        </li>
      </ul>
    </nav>
  )
}
