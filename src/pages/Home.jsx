import { useState, useEffect, useRef } from 'react'
import FlowerParticles from '../components/FlowerParticles'

export default function Home() {
  // Wedding Date: September 21, 2026 at 10:30 AM
  const weddingDate = new Date('2026-09-21T10:30:00')

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  // Royal Envelope Splash Overlay & Audio States
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [isClosingEnvelope, setIsClosingEnvelope] = useState(false)
  const [isDoorFinished, setIsDoorFinished] = useState(false)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const audioRef = useRef(null)
  const videoRef = useRef(null)

  // Ensure hero background video plays continuously without involuntary pauses
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true
    
    try {
      video.load()
      video.play().catch(() => {})
    } catch (e) {}

    const handlePauseOrEnd = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {})
      }
    }

    video.addEventListener('pause', handlePauseOrEnd)
    video.addEventListener('ended', handlePauseOrEnd)

    return () => {
      video.removeEventListener('pause', handlePauseOrEnd)
      video.removeEventListener('ended', handlePauseOrEnd)
    }
  }, [])

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    return timeLeft
  }

  // Prevent background scrolling while splash is closed
  useEffect(() => {
    if (!isEnvelopeOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      document.body.style.touchAction = 'none'
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.height = '100vh'
    } else {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.touchAction = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.touchAction = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
    }
  }, [isEnvelopeOpen])

  // Stop music immediately when navigating back, leaving page, or switching tabs
  useEffect(() => {
    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setIsPlayingMusic(false)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAudio()
      }
    }

    window.addEventListener('popstate', stopAudio)
    window.addEventListener('pagehide', stopAudio)
    window.addEventListener('beforeunload', stopAudio)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopAudio()
      window.removeEventListener('popstate', stopAudio)
      window.removeEventListener('pagehide', stopAudio)
      window.removeEventListener('beforeunload', stopAudio)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleOpenEnvelope = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch((err) => {
        console.log('Audio autoplay prevented:', err)
      })
    }
    setIsClosingEnvelope(true)
    setIsEnvelopeOpen(true)
    setTimeout(() => {
      setIsDoorFinished(true)
    }, 1200)
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    audioRef.current.volume = 1.0
    if (isPlayingMusic) {
      audioRef.current.pause()
      setIsPlayingMusic(false)
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {})
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Scroll Reveal Observer
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -35% 0px'
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right')
    elementsToReveal.forEach((el) => observer.observe(el))

    // Real-Time Timeline Scroll Traveler (Glides throughout the full line)
    const handleTimelineScroll = () => {
      const scheduleSection = document.getElementById('schedule')
      const traveler = document.getElementById('timeline-traveler')
      
      if (scheduleSection && traveler) {
        const rect = scheduleSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const sectionHeight = rect.height
        
        const progress = Math.min(Math.max((windowHeight * 0.65 - rect.top) / (sectionHeight * 0.8), 0), 1)
        traveler.style.top = `${progress * 100}%`
      }
    }

    window.addEventListener('scroll', handleTimelineScroll)
    handleTimelineScroll()

    return () => {
      clearInterval(timer)
      observer.disconnect()
      window.removeEventListener('scroll', handleTimelineScroll)
    }
  }, [])

  /* ───── Wishes Wall State & Persistence ───── */
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const defaultWishes = [
    {
      id: 1,
      author: 'Uncle Abbas & Family',
      relation: 'Family',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair! Wishing Reem & Naheem a lifetime of happiness, peace, and togetherness.',
      date: 'Aug 14, 2026'
    },
    {
      id: 2,
      author: 'Aisha & Tariq',
      relation: 'Friend of the Bride',
      message: 'So happy for both of you! May your marriage be filled with endless joy, love, and laughter.',
      date: 'Aug 13, 2026'
    },
    {
      id: 3,
      author: 'Dr. Moideen Khan',
      relation: 'Family Friend',
      message: 'Warmest congratulations to Reem Fathima & Mohamed Naheem. May Allah bless your union always.',
      date: 'Aug 12, 2026'
    }
  ]

  const [wishesList, setWishesList] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_wall')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return defaultWishes
  })

  const [newAuthor, setNewAuthor] = useState('')
  const [newRelation, setNewRelation] = useState('Friend of the Bride')
  const [newMessage, setNewMessage] = useState('')
  const [postedSuccess, setPostedSuccess] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [showAllWishes, setShowAllWishes] = useState(false)

  // Fetch initial wishes from persistent backend API or localStorage fallback
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/wishes`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setWishesList(data)
            localStorage.setItem('wedding_wishes_wall', JSON.stringify(data))
            return
          }
        }
      } catch (e) {}

      try {
        const resAlt = await fetch('http://localhost:5001/api/wishes')
        if (resAlt.ok) {
          const dataAlt = await resAlt.json()
          if (Array.isArray(dataAlt) && dataAlt.length > 0) {
            setWishesList(dataAlt)
            localStorage.setItem('wedding_wishes_wall', JSON.stringify(dataAlt))
          }
        }
      } catch (e) {}
    }

    fetchWishes()
  }, [API_URL])

  const handlePostWish = async (e) => {
    e.preventDefault()
    if (!newAuthor.trim() || !newMessage.trim()) return

    setIsPosting(true)
    const wishData = {
      author: newAuthor.trim(),
      relation: newRelation,
      message: newMessage.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    try {
      const res = await fetch(`${API_URL}/api/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wishData)
      })
      if (res.ok) {
        const savedWish = await res.json()
        const updated = [savedWish, ...wishesList.filter((w) => w.id !== savedWish.id)]
        setWishesList(updated)
        localStorage.setItem('wedding_wishes_wall', JSON.stringify(updated))
      } else {
        throw new Error('Server response not ok')
      }
    } catch (err) {
      // Local persistent fallback if offline
      const fallbackWish = { ...wishData, id: Date.now() }
      const updated = [fallbackWish, ...wishesList]
      setWishesList(updated)
      localStorage.setItem('wedding_wishes_wall', JSON.stringify(updated))
    } finally {
      setIsPosting(false)
      setNewAuthor('')
      setNewMessage('')
      setPostedSuccess(true)
      setTimeout(() => setPostedSuccess(false), 5000)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="page page-enter">
      {/* Hidden Audio Player */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Ambient Gold Flower Particle Background Layer */}
      {isEnvelopeOpen && <FlowerParticles />}

      {/* Floating Music Control Button (visible when playing/opened) */}
      {isEnvelopeOpen && (
        <button 
          className="floating-music-btn" 
          onClick={toggleMusic}
          title={isPlayingMusic ? "Pause Background Music" : "Play Background Music"}
        >
          {isPlayingMusic ? '🎵' : '🔇'}
        </button>
      )}

      {/* ─── 0. ROYAL SPLIT-DOOR SPLASH OVERLAY ─── */}
      {!isDoorFinished && (
        <div 
          className={`splash-split-container ${isClosingEnvelope ? 'opening-doors' : ''}`}
          onClick={handleOpenEnvelope}
          title="Click to Open Invitation"
        >
          {/* Left Half Door */}
          <div className="splash-door door-left">
            <img src="/royal_splash.jpg" alt="Royal Splash Left" className="door-img door-img-left" />
          </div>

          {/* Right Half Door */}
          <div className="splash-door door-right">
            <img src="/royal_splash.jpg" alt="Royal Splash Right" className="door-img door-img-right" />
          </div>

          {/* Centered Wax Seal Prompt */}
          <div className="splash-center-seal">
            <span className="seal-tap-text">💌 Tap to Open</span>
          </div>
        </div>
      )}

      {/* ─── 1. HERO SECTION (#home) ─── */}
      <section id="home" className="hero-section">
        {/* Top, Left, and Right Gold Underline Borders */}
        <div className="hero-border-top" />
        <div className="hero-border-left" />
        <div className="hero-border-right" />

        {/* Hero Video Background */}
        <div className="hero-video-wrapper">
          <video
            key="hero-video-bghero2"
            ref={videoRef}
            src="/bghero2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hero-video-bg"
          >
            <source src="/bghero2.mp4" type="video/mp4" />
            <source src="/bghero1.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        {/* Hero Content: Save Our Date at Top, Names in Center */}
        <div className="hero-content">
          {/* <div className="hero-header-top">
            <div className="hero-ornament">Save Our Date</div>
            <div className="hero-subtitle">WE ARE GETTING MARRIED</div>
          </div> */}

          <div className="hero-names-center">
            {/* <h1 className={`hero-names two-rows ${isEnvelopeOpen ? 'animated-name-reveal' : ''}`}>
              <span className="groom-name">Mohamed Naheem</span>
              <span className="and-symbol">&</span>
              <span className="bride-name">Reem Fathima</span>
            </h1> */}
          </div>
        </div>

        {/* Scroll Indicator at Bottom of Video */}
        <div className="hero-scroll-indicator" onClick={() => scrollToSection('details')} title="Scroll to Details">
          <div className="scroll-arrows-wrapper">
            <div className="scroll-arrow-chevron" />
            <div className="scroll-arrow-chevron" />
            <div className="scroll-arrow-chevron" />
          </div>
        </div>
      </section>

      {/* ─── 2. WEDDING DETAILS & COUNTDOWN SECTION (#details) ─── */}
      <section id="details" className="section" style={{ textAlign: 'center' }}>
        <div className="bismillah-text reveal-on-scroll" style={{ marginBottom: '20px' }}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>

        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">Wedding Details</h2>
          <p className="section-desc">
            Together with their families, we cordially invite you to celebrate the Nikkah of 
          </p>
        </div>

        {/* Parents' & Couple Names Banner (Vertical Stack UP & DOWN) */}
        <div className="parents-card vertical-stack reveal-on-scroll" style={{ margin: '0 auto 32px' }}>
          <div className="parents-group">
            <div className="parents-group-title">MOHAMED NAHEEM</div>
            <div className="parents-names">S/o Suhra & Moideen</div>
          </div>
          <div className="parents-stack-divider">&</div>
          <div className="parents-group">
            <div className="parents-group-title">REEM FATHIMA</div>
            <div className="parents-names">D/o Abida & Abbas</div>
          </div>
        </div>

        {/* Event Date Badge */}
        <div className="hero-date-badge reveal-on-scroll" style={{ margin: '0 auto 46px' }}>
          21<sup>ST</sup> SEPTEMBER 2026
        </div>

        {/* Live Countdown Ticker */}
        <div className="reveal-on-scroll" style={{ width: '100%', maxWidth: '580px', margin: '0 auto 36px', textAlign: 'center' }}>
          <div className="countdown-header-tag" style={{ marginBottom: '16px' }}>✦ REMAINING TIME FOR THE DAY ✦</div>
          <div className="countdown-container" style={{ margin: 0 }}>
            <div className="countdown-box">
              <div className="countdown-value">{timeLeft.days || 0}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-value">{timeLeft.hours || 0}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-value">{timeLeft.minutes || 0}</div>
              <div className="countdown-label">Mins</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-value">{timeLeft.seconds || 0}</div>
              <div className="countdown-label">Secs</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. VENUE LOCATION SECTION (#venue) ─── */}
      <section id="venue" className="section" style={{ background: 'rgba(20, 2, 5, 0.4)', borderTop: '1px solid var(--border)' }}>
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">Venue</h2>
        </div>

        <div className="venue-card-wrapper reveal-on-scroll" style={{ textAlign: 'center', width: '100%', maxWidth: '720px', margin: '0 auto' }}>
          <div className="venue-card">
            <h3 className="venue-name" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(26px, 5.5vw, 40px)', fontWeight: '800', color: 'var(--gold-light)', letterSpacing: '2px', marginBottom: '16px', textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
              GREEN PALACE AUDITORIUM
            </h3>

            {/* Embedded Interactive Map */}
            <div className="venue-map-container" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-gold)', margin: '0 0 20px', height: '320px', width: '100%' }}>
              <iframe
                title="Green Palace Auditorium Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=11.022212,76.032890&z=15&output=embed"
              />
            </div>

            <a
              href="https://www.bing.com/maps/search?name=Green+Palace+Auditorium&trfc=&mepi=0~~Embedded~LargeMapLink&FORM=MPSRPL&style=r&q=Green+Palace+Auditorium&ss=id.ypid%3AYN3B30623029436968&ppois=11.022212028503418_76.03289031982422_Green+Palace+Auditorium&cp=11.022212~76.032890&lvl=15"
              target="_blank"
              rel="noopener noreferrer"
              className="venue-map-text-link"
            >
              📍 Open Location Map ↗
            </a>
          </div>
        </div>
      </section>

      {/* ─── 4. PROGRAM SCHEDULE SECTION (#schedule) ─── */}
      <section id="schedule" className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">Program Schedule</h2>
        </div>

        <div className="royal-timeline">
          <div className="timeline-line">
            <div id="timeline-traveler" className="timeline-scroll-traveler">
              <img src="/user_gold_flower.png" alt="Gold Lotus Traveler" className="timeline-flower-img" />
            </div>
          </div>

          {/* Timeline Item 1: Nikkah */}
          <div className="timeline-item reveal-left">
            <div className="timeline-node" />
            <div className="timeline-content">
              <h3 className="timeline-title">Nikkah Ceremony</h3>
              <div className="timeline-time"> 10:30 AM</div>
            </div>
          </div>

          {/* Timeline Item 2: Reception */}
          <div className="timeline-item reveal-right">
            <div className="timeline-node" />
            <div className="timeline-content">
              <h3 className="timeline-title">Reception</h3>
              <div className="timeline-time"> 11:00 AM - 3:00 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. PHOTO GALLERY SECTION (#gallery) ─── */}
      <section id="gallery" className="section">
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">Together Forever</h2>
        </div>

        <div className="royal-gallery-featured-card reveal-on-scroll">
          {/* Framed Childhood Photo */}
          <div className="royal-photo-frame">
            <img src="/couple_photo.jpg" alt="Reem Fathima & Mohamed Naheem Childhood Photo" className="royal-featured-photo" />
          </div>

          {/* Bottom Cordial Invitation */}
          <div className="gallery-cordial-invitation">
            {/* <div className="cordial-badge">✦ CORDIAL INVITATION ✦</div> */}
            <p className="cordial-text">
              We cordially invite you to join us in celebrating our special day & sharing in our happiness.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 6. WISHES SCREEN WALL SECTION (#wishes) ─── */}
      <section id="wishes" className="section">
        <div className="section-header reveal-on-scroll">
          <h2 className="section-title">Wishes Wall</h2>
        </div>

        {/* Add Wish Form */}
        <div className="rsvp-container reveal-on-scroll" style={{ marginBottom: '40px' }}>
          <form onSubmit={handlePostWish}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zahra Ahmed"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Relationship / Role</label>
                <select
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                >
                  <option>Friend of the Bride</option>
                  <option>Friend of the Groom</option>
                  <option>Family Member</option>
                  <option>Well-Wisher</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Your Wish / Blessing Note *</label>
              <textarea
                rows="3"
                required
                placeholder="Write your prayers and congratulations for Reem & Naheem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isPosting} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', opacity: isPosting ? 0.7 : 1 }}>
              {isPosting ? 'Posting Wish...' : 'Post Your Wish ✨'}
            </button>

            {postedSuccess && (
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#22c55e', borderRadius: '12px', padding: '14px', textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
                ✓ Your wish has been posted to the Wishes Screen!
              </div>
            )}
          </form>
        </div>

        {/* Wishes Wall Feed (Initial 3 Wishes limit with View More button) */}
        <div className="wishes-wall-grid reveal-on-scroll">
          {(showAllWishes ? wishesList : wishesList.slice(0, 3)).map((wish) => (
            <div key={wish.id} className="wish-card">
              <div className="wish-card-quote">"{wish.message}"</div>
              <div className="wish-card-author">
                ✨ {wish.author}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(232, 219, 224, 0.7)', marginTop: '4px' }}>
                {wish.relation} • {wish.date}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Golden + More Button on the Right Side */}
        {wishesList.length >= 3 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', paddingRight: '4px' }}>
            <button
              onClick={() => setShowAllWishes(!showAllWishes)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--gold)',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '16px',
                fontWeight: '700',
                letterSpacing: '1px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                padding: '4px 8px'
              }}
            >
              {showAllWishes ? '– Less' : `+ More ${wishesList.length > 3 ? `(${wishesList.length - 3})` : ''}`}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
