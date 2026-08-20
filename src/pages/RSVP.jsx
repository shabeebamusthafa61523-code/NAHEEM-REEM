import { useState } from 'react'

export default function RSVP() {
  const [attendance, setAttendance] = useState('accept')
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    guestsCount: '1',
    dietaryChoice: 'Royal Feast (Non-Veg)',
    specialNotes: ''
  })

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(false)

  const handleOpenConfirmModal = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone) return
    setShowConfirmModal(true)
  }

  const handleFinalConfirm = () => {
    setShowConfirmModal(false)
    setSubmittedSuccess(true)
  }

  return (
    <div className="page page-enter">
      <section className="section">
        <div className="section-header">
          <span className="section-script">Your Presence is Requested</span>
          <h2 className="section-title">RSVP Confirmation</h2>
          <p className="section-desc">
            Please confirm your attendance for the Nikkah of <strong>Mohamed Naheem & Reem Fathima</strong> on <strong>21st September 2026</strong>.
          </p>
        </div>

        <div className="rsvp-container">
          {!submittedSuccess ? (
            <form onSubmit={handleOpenConfirmModal}>
              {/* Attendance Selection */}
              <div className="form-group">
                <label>Will you be attending the Nikkah?</label>
                <div className="radio-group">
                  <div 
                    className={`radio-option ${attendance === 'accept' ? 'selected' : ''}`}
                    onClick={() => setAttendance('accept')}
                  >
                    ✨ Joyfully Accepts
                  </div>
                  <div 
                    className={`radio-option ${attendance === 'decline' ? 'selected' : ''}`}
                    onClick={() => setAttendance('decline')}
                  >
                    🌹 Regretfully Declines
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Moideen / Family"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {attendance === 'accept' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Number of Attending Guests</label>
                    <select
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons (+1 Family)</option>
                      <option value="3">3 Persons (Family)</option>
                      <option value="4">4 Persons (Family)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Feast Preference</label>
                    <select
                      value={formData.dietaryChoice}
                      onChange={(e) => setFormData({ ...formData, dietaryChoice: e.target.value })}
                    >
                      <option>Royal Feast (Non-Vegetarian)</option>
                      <option>Vegetarian Special Banquet</option>
                      <option>Vegan / Custom Requirements</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Special Wishes / Message for the Families</label>
                <textarea
                  rows="3"
                  placeholder="Any message for Abbas & Abida / Moideen & Suhra..."
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Proceed to Confirm RSVP ✉️
              </button>
            </form>
          ) : (
            <div className="rsvp-success-card">
              <span className="rsvp-success-icon">✨🕌✨</span>
              <h3 className="rsvp-success-title">RSVP Confirmed!</h3>
              <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 24px' }}>
                {attendance === 'accept' 
                  ? `Alhamdulillah! We are honored to have ${formData.fullName} (${formData.guestsCount} guest(s)) join us on 21st September 2026 at 10:30 AM.`
                  : `Thank you for informing us, ${formData.fullName}. We deeply appreciate your warm prayers and blessings!`
                }
              </p>
              <button 
                className="btn btn-outline-gold"
                onClick={() => setSubmittedSuccess(false)}
              >
                ← Update Response
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Confirm Box Modal ─── */}
      {showConfirmModal && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal-box">
            <div className="confirm-modal-icon">💍</div>
            <h3 className="confirm-modal-title">Confirm Your RSVP</h3>
            <p style={{ fontSize: '14px', color: 'var(--text)' }}>
              Please review your details before submitting:
            </p>

            <div className="confirm-modal-details">
              <div><strong>Guest Name:</strong> {formData.fullName}</div>
              <div><strong>Contact:</strong> {formData.phone}</div>
              <div><strong>Status:</strong> {attendance === 'accept' ? 'Attending (Joyfully Accepts)' : 'Regretfully Declines'}</div>
              {attendance === 'accept' && (
                <>
                  <div><strong>Total Guests:</strong> {formData.guestsCount} Person(s)</div>
                  <div><strong>Feast Selection:</strong> {formData.dietaryChoice}</div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                className="btn btn-outline-gold"
                style={{ padding: '10px 20px', fontSize: '13px' }}
                onClick={() => setShowConfirmModal(false)}
              >
                Edit Form
              </button>
              <button 
                className="btn btn-gold"
                style={{ padding: '10px 24px', fontSize: '13px' }}
                onClick={handleFinalConfirm}
              >
                Confirm & Submit ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
