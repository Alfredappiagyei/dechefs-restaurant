import { Star, Award, Heart, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  const values = [
    { icon: <Star size={24} />, title: 'Quality', desc: 'We source the finest ingredients and prepare everything fresh to order.' },
    { icon: <Heart size={24} />, title: 'Hospitality', desc: 'We cherish our guests so much that we treat every visitor with the utmost high service.' },
    { icon: <Award size={24} />, title: 'Excellence', desc: 'Fine dining standards in everything we do — from the food to the ambiance.' },
    { icon: <Users size={24} />, title: 'Community', desc: 'Rooted in Teshie, serving Accra. We are proud to be your neighbourhood restaurant.' },
  ]

  return (
    <div className="about-page page-enter">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80" alt="Restaurant interior" />
          <div className="about-overlay" />
        </div>
        <div className="about-hero-content container">
          <div className="section-label">Our Story</div>
          <h1 className="about-hero-title">Crafted with Passion,<br /><em>Served with Pride</em></h1>
        </div>
      </div>

      {/* Story */}
      <section className="story-section container">
        <div className="story-grid">
          <div className="story-text">
            <div className="section-label">Who We Are</div>
            <h2 className="section-title">De Chefs <em>Restaurant</em></h2>
            <div className="gold-line" />
            <p>
              De Chefs Restaurant was founded on a simple but powerful vision: to bring fine dining quality
              to the heart of Teshie. We believe that exceptional food and service should be accessible —
              whether you're celebrating a special occasion or simply craving a great meal on a weekday.
            </p>
            <p>
              Our kitchen is helmed by highly trained chefs who blend traditional Ghanaian flavours with
              contemporary technique. From the perfectly seasoned jollof rice to our signature crispy
              fried chicken, every dish is a labour of love.
            </p>
            <p>
              We operate 24 hours a day because hunger doesn't keep office hours — and neither do we.
              With fine dining, delivery, drive-through and reservation options, we've designed every
              aspect of De Chefs to fit your lifestyle.
            </p>
          </div>
          <div className="story-imgs">
            <img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80" alt="Chef cooking" className="story-img-main" />
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" alt="Food" className="story-img-accent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container stats-grid">
          {[
            { num: '4.4★', label: 'Google Rating' },
            { num: '31+', label: 'Happy Reviews' },
            { num: '24/7', label: 'Always Open' },
            { num: '20+', label: 'Menu Items' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="values-section container">
        <div className="section-label">What Drives Us</div>
        <h2 className="section-title" style={{textAlign:'center'}}>Our <em>Values</em></h2>
        <div className="gold-line center" />
        <div className="values-grid">
          {values.map(v => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* From the Owner */}
      <section className="owner-section container">
        <div className="owner-card">
          <div className="quote-mark">"</div>
          <blockquote className="owner-quote">
            DeChef's Restaurant has fine dining, delivery, a drive-through and what have you.
            It is our hope that in no time we will start to operate fully around the clock.
            We cherish our guests so, so much that we treat every visitor with the utmost,
            high-service trained team.
          </blockquote>
          <div className="owner-sig">
            <div className="owner-avatar">DC</div>
            <div>
              <p className="owner-name">De Chefs Team</p>
              <p className="owner-role">Management, De Chefs Restaurant</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Come Dine With Us</h2>
        <p>Book a table or order online — we'd love to serve you.</p>
        <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginTop:24}}>
          <Link to="/order" className="btn-primary">Order Online</Link>
          <Link to="/contact" className="btn-outline">Make a Reservation</Link>
        </div>
      </section>
    </div>
  )
}
