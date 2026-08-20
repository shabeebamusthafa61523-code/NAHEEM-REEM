export default function About() {
  return (
    <div className="page page-enter">
      <section className="about-hero">
        <div>
          <span className="section-label">About Us</span>
          <h1 className="section-title">Crafting digital experiences with passion</h1>
          <p className="section-sub" style={{ marginTop: '16px' }}>
            We specialize in building scalable full-stack web applications using the MERN stack with modern responsive design principles.
          </p>
          <div className="stack-pills">
            <span className="pill">React 19</span>
            <span className="pill">Express.js</span>
            <span className="pill">Node.js</span>
            <span className="pill">Tailwind CSS</span>
            <span className="pill">Vite</span>
            <span className="pill">JavaScript</span>
          </div>
        </div>
        <div className="about-image-wrap">
          <div className="about-image-blob" />
          <div className="about-image-card">
            <div className="about-avatar">💻</div>
            <h3 style={{ color: 'var(--text-h)', margin: 0 }}>Full-Stack Stack</h3>
            <p style={{ fontSize: '13px', margin: 0 }}>Clean & Scalable Architecture</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section max-w centered">
        <span className="section-label">Our Team</span>
        <h2 className="section-title">Meet the Creators</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          Dedicated engineers and designers building the future of web apps.
        </p>

        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">👨‍💻</div>
            <div className="team-name">Alex Rivera</div>
            <div className="team-role">Lead Frontend Engineer</div>
            <div className="team-bio">Specializing in React UI performance, micro-animations, and modern CSS architecture.</div>
          </div>
          <div className="team-card">
            <div className="team-avatar">👩‍💻</div>
            <div className="team-name">Sarah Chen</div>
            <div className="team-role">Backend Architect</div>
            <div className="team-bio">Expert in Node.js microservices, Express APIs, database optimization, and cloud ops.</div>
          </div>
          <div className="team-card">
            <div className="team-avatar">🎨</div>
            <div className="team-name">David Vance</div>
            <div className="team-role">UI/UX Designer</div>
            <div className="team-bio">Obsessed with sleek glassmorphism, dark themes, typography, and intuitive user journeys.</div>
          </div>
        </div>
      </section>
    </div>
  )
}
