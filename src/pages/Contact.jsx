import { useState } from 'react'
import { MapPin, Phone, Clock, Mail, Check } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', guests: '2', date: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', phone: '', email: '', guests: '2', date: '', message: '' })
  }

  return (
    <div className="contact-page page-enter">
      <div className="contact-hero">
        <div className="container">
          <div className="section-label">Get in Touch</div>
          <h1 className="contact-title">Contact & <em>Reservations</em></h1>
          <p className="contact-sub">Reserve a table, ask a question, or just say hello.</p>
        </div>
      </div>

      <div className="contact-layout container">
        {/* Info */}
        <aside className="contact-info">
          <div className="info-block">
            <div className="info-block-icon"><MapPin size={20} /></div>
            <div>
              <h3>Location</h3>
              <p>Teshie-Ataa Abossey</p>
              <p>Demo Barracks, Accra</p>
              <p>Greater Accra Region, Ghana</p>
            </div>
          </div>

          <div className="info-block">
            <div className="info-block-icon"><Phone size={20} /></div>
            <div>
              <h3>Phone</h3>
              <a href="tel:0246324137" className="contact-link">024 632 4137</a>
              <br />
              <a href="tel:0500000507" className="contact-link">050 000 0507</a>
            </div>
          </div>

          <div className="info-block">
            <div className="info-block-icon"><Clock size={20} /></div>
            <div>
              <h3>Hours</h3>
              <p className="open-now">🟢 Open Now — 24 Hours, 7 Days</p>
              <p style={{fontSize:'0.85rem', marginTop:4, color:'var(--text-dim)'}}>We never close.</p>
            </div>
          </div>

          <div className="info-block">
            <div className="info-block-icon"><Mail size={20} /></div>
            <div>
              <h3>Order Online</h3>
              <p>Available via Bolt Food delivery</p>
              <a
                href="https://food.bolt.eu/en-US/137/p/70951"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Order on Bolt Food →
              </a>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="map-embed">
            <iframe
              title="De Chefs Location"
              src="https://www.google.com/maps?q=Teshie+Accra+Ghana&output=embed"
              loading="lazy"
              style={{border:0, width:'100%', height:220, borderRadius:12}}
              allowFullScreen
            />
          </div>
        </aside>

        {/* Form */}
        <main className="contact-form-wrap">
          <h2 className="form-title">Make a Reservation</h2>
          <p className="form-sub">Fill in the form below and we'll call you to confirm your booking.</p>

          {sent && (
            <div className="form-success">
              <Check size={18} /> Reservation request sent! We'll call you shortly.
            </div>
          )}

          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="024 xxx xxxx" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email (optional)</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <select name="guests" value={form.guests} onChange={handleChange}>
                  {['1','2','3','4','5','6','7','8','9','10+'].map(n => (
                    <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Preferred Date & Time</label>
              <input name="date" type="datetime-local" value={form.date} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Special Requests or Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                placeholder="Dietary requirements, occasion, preferred seating…" />
            </div>

            <button type="submit" className="btn-primary submit-btn">
              Submit Reservation Request
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}
