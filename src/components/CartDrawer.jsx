import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CheckoutModal from './CheckoutModal'
import './CartDrawer.css'

export default function CartDrawer({ open, onClose }) {
  const { items, total, dispatch } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <>
      <div className={`drawer-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Your Order</h2>
            <p className="drawer-sub">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="drawer-close" onClick={onClose}><X size={20} /></button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} className="empty-icon" />
            <p>Your cart is empty</p>
            <Link to="/order" className="btn-primary" onClick={onClose} style={{marginTop: 16}}>
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.cartKey} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    {item.selectedExtras?.length > 0 && (
                      <p className="cart-item-extras">+ {item.selectedExtras.map(e => e.name).join(', ')}</p>
                    )}
                    <p className="cart-item-price">GH₵{item.totalPrice}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => dispatch({ type: 'UPDATE_QTY', cartKey: item.cartKey, qty: item.quantity - 1 })}>
                      <Minus size={14} />
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => dispatch({ type: 'UPDATE_QTY', cartKey: item.cartKey, qty: item.quantity + 1 })}>
                      <Plus size={14} />
                    </button>
                    <button className="remove-btn" onClick={() => dispatch({ type: 'REMOVE_ITEM', cartKey: item.cartKey })}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>GH₵{total}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free-tag">Free</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>GH₵{total}</span>
                </div>
              </div>
              <button
                className="btn-primary checkout-btn"
                onClick={() => { setCheckoutOpen(true); onClose(); }}
              >
                Proceed to Checkout — GH₵{total}
              </button>
            </div>
          </>
        )}
      </aside>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}
