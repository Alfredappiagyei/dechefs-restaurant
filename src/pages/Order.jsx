import { useState } from 'react'
import { Search, ShoppingBag } from 'lucide-react'
import menuData from '../data/menu.json'
import ItemModal from '../components/ItemModal'
import { useCart } from '../context/CartContext'
import CartDrawer from '../components/CartDrawer'
import './Order.css'

export default function Order() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const { count, total } = useCart()

  const allItems = menuData.categories.flatMap(c =>
    c.items.map(item => ({ ...item, categoryId: c.id, categoryName: c.name }))
  )

  const filtered = allItems.filter(item => {
    const matchCat = activeCategory === 'all' || item.categoryId === activeCategory
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const grouped = activeCategory === 'all'
    ? menuData.categories.map(c => ({
        ...c,
        filteredItems: c.items.filter(item =>
          !search || item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(c => c.filteredItems.length > 0)
    : null

  return (
    <div className="order-page page-enter">
      {/* Header */}
      <div className="order-hero">
        <div className="container">
          <div className="section-label">Order Online</div>
          <h1 className="order-title">Our <em>Menu</em></h1>
          <p className="order-sub">Fresh, made-to-order. Select your dishes and we'll handle the rest.</p>
        </div>
      </div>

      <div className="order-layout container">
        {/* Sticky sidebar */}
        <aside className="order-sidebar">
          {/* Search */}
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search dishes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="cat-nav">
            <button
              className={`cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              🍽 All Items
            </button>
            {menuData.categories.map(c => (
              <button
                key={c.id}
                className={`cat-btn ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>

          {/* Cart summary */}
          {count > 0 && (
            <div className="sidebar-cart" onClick={() => setCartOpen(true)}>
              <div className="sidebar-cart-info">
                <ShoppingBag size={18} />
                <span>{count} item{count !== 1 ? 's' : ''}</span>
              </div>
              <span className="sidebar-cart-total">GH₵{total}</span>
            </div>
          )}
        </aside>

        {/* Menu content */}
        <main className="order-main">
          {activeCategory === 'all' && grouped ? (
            grouped.map(category => (
              <div key={category.id} className="category-section">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h2 className="category-name">{category.name}</h2>
                  <span className="category-count">{category.filteredItems.length} items</span>
                </div>
                <div className="menu-grid">
                  {category.filteredItems.map(item => (
                    <MenuCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="category-section">
              {filtered.length === 0 ? (
                <div className="no-results">
                  <p>No dishes found for "{search}"</p>
                  <button className="btn-outline" onClick={() => setSearch('')}>Clear search</button>
                </div>
              ) : (
                <div className="menu-grid">
                  {filtered.map(item => (
                    <MenuCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile cart bar */}
      {count > 0 && (
        <div className="mobile-cart-bar" onClick={() => setCartOpen(true)}>
          <div className="mobile-cart-left">
            <ShoppingBag size={18} />
            <span>{count} item{count !== 1 ? 's' : ''}</span>
          </div>
          <span className="mobile-cart-label">View Order</span>
          <span className="mobile-cart-total">GH₵{total}</span>
        </div>
      )}

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

function MenuCard({ item, onClick }) {
  return (
    <div className="menu-card" onClick={onClick}>
      <div className="menu-card-img-wrap">
        <img src={item.image} alt={item.name} className="menu-card-img" loading="lazy" />
        {item.popular && <span className="popular-pill">⭐ Popular</span>}
        <div className="menu-card-hover-overlay">
          <span>View & Customize</span>
        </div>
      </div>
      <div className="menu-card-body">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>
        <div className="menu-card-footer">
          <span className="menu-card-price">GH₵{item.price}</span>
          <button className="add-btn">+ Add</button>
        </div>
      </div>
    </div>
  )
}
