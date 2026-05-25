import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Star, ChevronRight, Utensils, Truck, Calendar } from 'lucide-react'
import menuData from '../data/menu.json'
import { useState } from 'react'
import ItemModal from '../components/ItemModal'
import './Home.css'

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null)

  // Get popular items across all categories
  const popular = menuData.categories
    .flatMap(c => c.items.filter(i => i.popular))
    .slice(0, 6)

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85"
            alt="Restaurant ambiance"
            className="hero-img"
          />
          <div className="hero-overlay" />
          <div className="hero-grain" />
        </div>
        <div className="hero-content container">
          <div className="hero-badge">
            <Star size={12} fill="currentColor" /> &nbsp;4.4 · 31 Reviews · Teshie, Accra
          </div>
          <h1 className="hero-title">
            Fine Dining,<br />
            <em>Ghanaian Soul</em>
          </h1>
          <p className="hero-tagline">
            From our kitchen to your table — where tradition meets bold flavour.
            Dine in, delivery, or drive-through. Open 24 hours.
          </p>
          <div className="hero-actions">
            <Link to="/order" className="btn-primary hero-cta">
              Order Online <ChevronRight size={18} />
            </Link>
            <a href="tel:0246324137" className="btn-outline">
              <Phone size={16} /> Call Us
            </a>
          </div>
        </div>
        <div className="hero-scroll">scroll to explore ↓</div>
      </section>

      {/* Info strip */}
      <section className="info-strip">
        <div className="container info-grid">
          <div className="info-card">
            <MapPin size={20} className="info-icon" />
            <div>
              <p className="info-label">Location</p>
              <p className="info-value">Teshie-Ataa Abossey, Demo Barracks</p>
            </div>
          </div>
          <div className="info-card">
            <Clock size={20} className="info-icon" />
            <div>
              <p className="info-label">Hours</p>
              <p className="info-value open-badge">Open 24 Hours</p>
            </div>
          </div>
          <div className="info-card">
            <Phone size={20} className="info-icon" />
            <div>
              <p className="info-label">Reservations</p>
              <p className="info-value"><a href="tel:0246324137" className="phone-link">024 632 4137</a></p>
            </div>
          </div>
          <div className="info-card">
            <Truck size={20} className="info-icon" />
            <div>
              <p className="info-label">Delivery via</p>
              <p className="info-value">Bolt Food · GH₵50–100/person</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section container">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">A Complete <em>Experience</em></h2>
        <div className="gold-line center" />
        <div className="services-grid">
          {[
            { icon: <Utensils size={28} />, title: 'Fine Dining', desc: 'Sit-down experience with attentive, high-quality service in our elegantly appointed dining room.' },
            { icon: <Truck size={28} />, title: 'Delivery', desc: 'Order via Bolt Food and get your favourite De Chefs meals delivered right to your door.' },
            { icon: <Calendar size={28} />, title: 'Reservations', desc: 'Book a table for special occasions. We cherish our guests and treat them with utmost care.' },
            { icon: '🚗', title: 'Drive-Through', desc: 'Grab your meal on the go — our drive-through makes it easy and quick.' },
          ].map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{typeof s.icon === 'string' ? <span style={{fontSize:28}}>{s.icon}</span> : s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular items */}
      <section className="popular-section">
        <div className="container">
          <div className="section-label">Fan Favourites</div>
          <div className="popular-header">
            <h2 className="section-title">Most <em>Popular</em></h2>
            <Link to="/order" className="view-all">View full menu →</Link>
          </div>
          <div className="gold-line" />
          <div className="popular-grid">
            {popular.map(item => (
              <div key={item.id} className="food-card" onClick={() => setSelectedItem(item)}>
                <div className="food-card-img-wrap">
                  <img src={item.image} alt={item.name} className="food-card-img" />
                  <div className="food-card-overlay">
                    <span className="food-card-order">+ Add to Order</span>
                  </div>
                </div>
                <div className="food-card-body">
                  <h3 className="food-card-name">{item.name}</h3>
                  <p className="food-card-desc">{item.description.slice(0, 65)}…</p>
                  <div className="food-card-footer">
                    <span className="food-card-price">GH₵{item.price}</span>
                    <div className="food-tags">
                      {item.tags?.slice(0, 2).map(t => <span key={t} className="food-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="popular-cta">
            <Link to="/order" className="btn-primary">
              Browse Full Menu <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="about-teaser container">
        <div className="about-teaser-img-col">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" alt="Restaurant interior" />
          <div className="about-teaser-badge">
            <span className="badge-num">4.4</span>
            <Star size={14} fill="var(--gold)" color="var(--gold)" />
            <span className="badge-label">Google Rating</span>
          </div>
        </div>
        <div className="about-teaser-content">
          <div className="section-label">Our Story</div>
          <h2 className="section-title">More Than Just <em>Food</em></h2>
          <div className="gold-line" />
          <p>
            De Chefs Restaurant is built on the belief that every guest deserves an exceptional experience.
            From our signature fried chicken to authentic Ghanaian classics, every dish is prepared with
            love, quality ingredients, and the skill of trained chefs.
          </p>
          <p>
            We are a fine dining restaurant with a warm local soul — serving Accra 24 hours a day,
            with delivery, drive-through, and reservation options.
          </p>
          <Link to="/about" className="btn-outline" style={{marginTop: 12}}>
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="cta-inner container">
          <h2>Ready to eat something <em>extraordinary?</em></h2>
          <p>Order online now or call us to make a reservation.</p>
          <div className="hero-actions">
            <Link to="/order" className="btn-primary">Order Online Now</Link>
            <a href="tel:0246324137" className="btn-outline"><Phone size={16} /> 024 632 4137</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-main">🍽 De Chefs Restaurant</span>
            <p>Teshie-Ataa Abossey, Demo Barracks, Accra</p>
            <p>Open 24 Hours · 024 632 4137</p>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/order">Order Online</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <p className="footer-copy">© 2025 De Chefs Restaurant. All rights reserved.</p>
        </div>
      </footer>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  )
}
