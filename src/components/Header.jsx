import React from 'react'

export default function Header({ cart, onRemove, onClear, onCheckout }) {
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0)
  return (
    <header className="header">
      <div className="brand">
        <a href="">Agri Products</a>
      </div>
      <div className="search">
        <input placeholder="Search products, e.g., seeds, fertilizer..." />
      </div>
      <div className="cart">
        <details>
          <summary>Cart ({cart.length})</summary>
          <div className="cart-list">
            {cart.length === 0 ? (
              <p className="empty">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt="" />
                  <div className="cart-meta">
                    <strong>{item.name}</strong>
                    <div>Qty: {item.qty}</div>
                    <div>₹{item.price * item.qty}</div>
                  </div>
                  <button className="small" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="cart-actions">
            <strong>Total: ₹{total}</strong>
            <div>
              <button onClick={onClear}>Clear</button>
              <button onClick={onCheckout}>Checkout</button>
            </div>
          </div>
        </details>
      </div>
    </header>
  )
}
