import { useState } from 'react'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './ItemModal.css'

export default function ItemModal({ item, onClose }) {
  const [selectedExtras, setSelectedExtras] = useState([])
  const [qty, setQty] = useState(1)
  const { dispatch } = useCart()

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0)
  const unitPrice = item.price + extrasTotal
  const total = unitPrice * qty

  function toggleExtra(extra) {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    )
  }

  function addToCart() {
    const cartKey = `${item.id}-${selectedExtras.map(e => e.id).sort().join(',')}`
    dispatch({
      type: 'ADD_ITEM',
      item: {
        cartKey,
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        selectedExtras,
        totalPrice: unitPrice,
      }
    })
    onClose()
  }

  return (
    <div className="item-overlay" onClick={onClose}>
      <div className="item-modal" onClick={e => e.stopPropagation()}>
        <div className="item-hero">
          <img src={item.image} alt={item.name} className="item-hero-img" />
          <div className="item-hero-overlay">
            <div className="item-tags">
              {item.tags?.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <button className="item-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="item-body">
          <div className="item-header">
            <h2 className="item-name">{item.name}</h2>
            <span className="item-base-price">GH₵{item.price}</span>
          </div>
          <p className="item-desc">{item.description}</p>

          {item.extras?.length > 0 && (
            <div className="extras-section">
              <h3 className="extras-title">Add Extras</h3>
              <div className="extras-list">
                {item.extras.map(extra => {
                  const selected = selectedExtras.find(e => e.id === extra.id)
                  return (
                    <button
                      key={extra.id}
                      className={`extra-chip ${selected ? 'selected' : ''}`}
                      onClick={() => toggleExtra(extra)}
                    >
                      <span>{extra.name}</span>
                      {extra.price > 0 && <span className="extra-price">+GH₵{extra.price}</span>}
                      {extra.price === 0 && <span className="extra-price free">free</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="item-footer">
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>
                <Minus size={16} />
              </button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>
                <Plus size={16} />
              </button>
            </div>
            <button className="add-cart-btn btn-primary" onClick={addToCart}>
              <ShoppingBag size={18} />
              Add to Order · GH₵{total}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
