import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = action.item.cartKey
      const existing = state.items.find(i => i.cartKey === key)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.cartKey === key ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartKey !== action.cartKey) }
    case 'UPDATE_QTY': {
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartKey !== action.cartKey) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartKey === action.cartKey ? { ...i, quantity: action.qty } : i
        )
      }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const total = state.items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0)
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ ...state, total, count, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
