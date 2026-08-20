import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Events() {
  // Wedding Date: September 21, 2026 at 10:30 AM
  const weddingDate = new Date('2026-09-21T10:30:00')

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page page-enter">
      {/* ─── Parents & Date Header Section ─── */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <div className="section-header">
          <span className="section-script">The Auspicious Occasion</span>
          <h2 className="section-title">Wedding Details & Schedule</h2>
          <p className="section-desc">
            Together with their families, we cordially invite you to celebrate the Nikkah of <strong>Mohamed Naheem & Reem Fathima</strong>.
          </p>
        </div>

        {/* ─── Parents' Names Banner ─── */}
        <div className="parents-card" style={{ margin: '0 auto 32px' }}>
          <div className="parents-group">
            <div className="parents-group-title">PARENTS OF THE GROOM</div>
            <div className="parents-names">Abida & Abbas</div>
          </div>
          <div className="parents-divider" />
          <div className="parents-group">
            <div className="parents-group-title">PARENTS OF THE BRIDE</div>
            <div className="parents-names">Suhra & Moideen</div>
          </div>
        </div>

        {/* ─── Event Date & Time Badge ─── */}
        <div className="hero-date-badge" style={{ margin: '0 auto 32px' }}>
          ✦ 21ST SEPTEMBER 2026 ✦
        </div>

        {/* ─── Live Countdown Ticker ─── */}
        <div className="countdown-container">
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
      </section>

      {/* ─── Event Schedule Cards ─── */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)', borderTop: '1px solid var(--border)' }}>
        <div className="section-header">
          <span className="section-script">Program Schedule</span>
          <h2 className="section-title">Nikkah Ceremony & Events</h2>
        </div>

        <div className="events-grid">
          <div className="event-card" style={{ borderColor: 'var(--gold)' }}>
            <span className="event-card-tag" style={{ background: 'var(--gold-grad)', color: '#110d18', fontWeight: 'bold' }}>
              MAIN CEREMONY • 21/09/2026
            </span>
            <h3 className="event-card-title">Holy Nikkah Ceremony</h3>
            <div className="event-card-time">⏰ 10:30 AM SHARP</div>
            <p className="event-card-location">
              <strong>The Grand Royal Convention Center</strong><br />
              Palace Road, Central Auditorium Hall
            </p>
            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '16px', fontSize: '13px', color: 'var(--gold-light)' }}>
              ✨ <strong>Dress Code:</strong> Traditional Festive / Modest Formal
            </div>
          </div>

          <div className="event-card">
            <span className="event-card-tag">FEAST & CELEBRATION</span>
            <h3 className="event-card-title">Walima & Festive Banquet</h3>
            <div className="event-card-time">⏰ 12:30 PM ONWARDS</div>
            <p className="event-card-location">
              <strong>Grand Dining Pavilion</strong><br />
              The Grand Royal Convention Hall
            </p>
            <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '16px', fontSize: '13px', color: 'var(--text)' }}>
              🍛 <strong>Banquet:</strong> Authentic Royal Feast & Desserts
            </div>
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery Section ─── */}
      <section className="section">
        <div className="section-header">
          <span className="section-script">Cherished Moments</span>
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-desc">
            A glimpse into our journey of love, family blessings, and togetherness.
          </p>
        </div>

        <div className="photo-gallery-grid">
          <div className="gallery-card">
            <img src="/couple.jpg" alt="Mohamed Naheem & Reem Fathima portrait" />
            <div className="gallery-card-overlay">
              <div className="gallery-card-caption">Mohamed Naheem & Reem Fathima</div>
            </div>
          </div>
          <div className="gallery-card">
            <img src="/venue.jpg" alt="Wedding Venue Celebration Hall" />
            <div className="gallery-card-overlay">
              <div className="gallery-card-caption">Grand Banquet & Nikkah Hall</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Dress Code Section ─── */}
      <section className="section" style={{ background: 'rgba(255, 255, 255, 0.015)', borderTop: '1px solid var(--border)' }}>
        <div className="section-header">
          <span className="section-script">Attire Guidance</span>
          <h2 className="section-title">Dress Code</h2>
          <p className="section-desc">
            We invite our guests to join us in elegant traditional & formal attire to celebrate our special day.
          </p>
        </div>

        <div className="dress-code-grid">
          <div className="dress-card">
            <span className="dress-icon">✨</span>
            <h3 className="dress-title">Traditional & Modest Formal</h3>
            <p className="dress-desc">
              Graceful Sherwanis, Kurtas, Sarees, Lehengas, or Elegant Abayas & Modest Gowns.
            </p>
            <div className="color-swatches">
              <div className="swatch" style={{ background: '#e6ca65' }} title="Champagne Gold" />
              <div className="swatch" style={{ background: '#047857' }} title="Emerald Green" />
              <div className="swatch" style={{ background: '#f7e7a9' }} title="Cream Ivory" />
              <div className="swatch" style={{ background: '#991b1b' }} title="Deep Maroon" />
            </div>
          </div>
          <div className="dress-card">
            <span className="dress-icon">🌿</span>
            <h3 className="dress-title">Color Palette Suggestions</h3>
            <p className="dress-desc">
              Soft gold, champagne, emerald green, pastel rose, and regal royal tones.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/rsvp" className="btn btn-gold">
            Confirm Your Attendance (RSVP) 💌 →
          </Link>
        </div>
      </section>
    </div>
  )
}
