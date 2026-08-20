import { useState } from 'react'

export default function Wishes() {
  const [wishesList, setWishesList] = useState([
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
  ])

  const [newAuthor, setNewAuthor] = useState('')
  const [newRelation, setNewRelation] = useState('Friend')
  const [newMessage, setNewMessage] = useState('')
  const [postedSuccess, setPostedSuccess] = useState(false)

  const handlePostWish = (e) => {
    e.preventDefault()
    if (!newAuthor || !newMessage) return

    const newWish = {
      id: Date.now(),
      author: newAuthor,
      relation: newRelation,
      message: newMessage,
      date: 'Just Now'
    }

    setWishesList([newWish, ...wishesList])
    setNewAuthor('')
    setNewMessage('')
    setPostedSuccess(true)
    setTimeout(() => setPostedSuccess(false), 4000)
  }

  return (
    <div className="page page-enter">
      <section className="section">
        <div className="section-header">
          <span className="section-script">Blessings & Prayers</span>
          <h2 className="section-title">Wishes Screen for the Couple</h2>
          <p className="section-desc">
            Leave your warm wishes, duas, and messages for <strong>Reem Fathima & Mohamed Naheem</strong>.
          </p>
        </div>

        {/* ─── Add Wish Form ─── */}
        <div className="rsvp-container" style={{ marginBottom: '60px' }}>
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

            <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              Post Your Wish ✨
            </button>

            {postedSuccess && (
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#22c55e', borderRadius: '12px', padding: '14px', textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
                ✓ Your wish has been posted to the Wishes Screen!
              </div>
            )}
          </form>
        </div>

        {/* ─── Wishes Wall Feed ─── */}
        <div className="wishes-wall-grid">
          {wishesList.map((wish) => (
            <div key={wish.id} className="wish-card">
              <div className="wish-card-quote">"{wish.message}"</div>
              <div className="wish-card-author">
                ✨ {wish.author}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(207, 198, 221, 0.6)', marginTop: '4px' }}>
                {wish.relation} • {wish.date}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
