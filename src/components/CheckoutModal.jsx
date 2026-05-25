import { useState } from 'react'
import { X, Check, MapPin, Phone, User, Clock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './CheckoutModal.css'

const STEPS = ['Details', 'Delivery', 'Confirm']

export default function CheckoutModal({ open, onClose }) {
  const { items, total, dispatch } = useCart()
  const [step, setStep] = useState(0)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', address: '', notes: '', deliveryType: 'delivery'
  })

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleNext() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else placeOrder()
  }

  function placeOrder() {
    setSuccess(true)
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      setSuccess(false)
      setStep(0)
      setForm({ name: '', phone: '', address: '', notes: '', deliveryType: 'delivery' })
      onClose()
    }, 3500)
  }

  function handleClose() {
    setStep(0)
    setSuccess(false)
    onClose()
  }

  if (!open) return null

  if (success) return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal success-modal" onClick={e => e.stopPropagation()}>
        <div className="success-icon"><Check size={40} strokeWidth={2.5} /></div>
        <h2 className="success-title">Order Placed!</h2>
        <p className="success-text">Thank you, {form.name || 'valued customer'}! Your order has been received. We'll call you at <strong>{form.phone}</strong> to confirm.</p>
        <p className="success-eta">Estimated time: <span>30–45 minutes</span></p>
      </div>
    </div>
  )

  const canProceed = () => {
    if (step === 0) return form.name.trim() && form.phone.trim()
    if (step === 1) return form.deliveryType === 'pickup' || form.address.trim()
    return true
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Checkout</h2>
          <button className="modal-close" onClick={handleClose}><X size={20} /></button>
        </div>

        {/* Step indicator */}
        <div className="step-indicator">
          {STEPS.map((s, i) => (
            <div key={s} className={`step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
              <div className="step-dot">{i < step ? <Check size={12} /> : i + 1}</div>
              <span className="step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="modal-body">
          {step === 0 && (
            <div className="form-step">
              <h3 className="step-title">Your Details</h3>
              <div className="form-group">
                <label><User size={14} /> Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label><Phone size={14} /> Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 024 632 4137" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="form-step">
              <h3 className="step-title">Delivery Options</h3>
              <div className="delivery-toggle">
                <button
                  className={`toggle-opt ${form.deliveryType === 'delivery' ? 'active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, deliveryType: 'delivery' }))}
                >
                  🚴 Delivery
                </button>
                <button
                  className={`toggle-opt ${form.deliveryType === 'pickup' ? 'active' : ''}`}
                  onClick={() => setForm(f => ({ ...f, deliveryType: 'pickup' }))}
                >
                  🏪 Pickup
                </button>
              </div>
              {form.deliveryType === 'delivery' && (
                <div className="form-group">
                  <label><MapPin size={14} /> Delivery Address</label>
                  <textarea name="address" value={form.address} onChange={handleChange} placeholder="Enter your full address" rows={3} />
                </div>
              )}
              {form.deliveryType === 'pickup' && (
                <div className="pickup-info">
                  <MapPin size={16} />
                  <div>
                    <strong>De Chefs Restaurant</strong>
                    <p>Teshie-Ataa Abossey, Demo Barracks, Accra</p>
                    <p className="pickup-hours"><Clock size={12} /> Open 24 hours</p>
                  </div>
                </div>
              )}
              <div className="form-group">
                <label>Special Instructions (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Allergies, extra spice, etc." rows={2} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3 className="step-title">Order Summary</h3>
              <div className="confirm-items">
                {items.map(item => (
                  <div key={item.cartKey} className="confirm-item">
                    <span className="confirm-name">{item.quantity}× {item.name}</span>
                    <span className="confirm-price">GH₵{item.totalPrice * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="confirm-details">
                <div className="confirm-row"><span>Name</span><strong>{form.name}</strong></div>
                <div className="confirm-row"><span>Phone</span><strong>{form.phone}</strong></div>
                <div className="confirm-row"><span>Type</span><strong style={{textTransform:'capitalize'}}>{form.deliveryType}</strong></div>
                {form.address && <div className="confirm-row"><span>Address</span><strong>{form.address}</strong></div>}
                <div className="confirm-row total-confirm"><span>Total</span><strong>GH₵{total}</strong></div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step > 0 && (
            <button className="btn-outline" onClick={() => setStep(s => s - 1)}>Back</button>
          )}
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ flex: 1 }}
          >
            {step === STEPS.length - 1 ? '🍽 Place Order' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}
