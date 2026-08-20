import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Query', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: 'General Query', message: '' })
    }, 500)
  }

  return (
    <div className="page page-enter">
      <div className="contact-wrap">
        <div className="contact-info">
          <span className="section-label">Contact Us</span>
          <h1>Let's build something <span className="grad">great together.</span></h1>
          <p>Have a question, feedback, or a project proposal? Send us a message and our team will respond within 24 hours.</p>

          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div className="contact-item-text">
                <strong>Our Office</strong>
                <span>Innovation Park, Suite 400</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <div className="contact-item-text">
                <strong>Email Us</strong>
                <span>hello@mernapp.example.com</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">⚡</div>
              <div className="contact-item-text">
                <strong>Fast Response</strong>
                <span>Average reply time: under 2 hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          <h2 className="form-title">Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              >
                <option>General Query</option>
                <option>Project Inquiry</option>
                <option>Technical Support</option>
                <option>Partnership</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="4"
                required
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Message →
            </button>

            {submitted && (
              <div className="form-success">
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
