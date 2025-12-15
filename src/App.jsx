import React, { useState, useEffect } from 'react'
import products from './data/products.json'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import './styles.css'

export default function App() {
  const [cart, setCart] = useState([])
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id))
  const clearCart = () => setCart([])

  const renderHome = () => (
    <div className="container">
      <h1>Featured Agri Products</h1>
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
        ))}
      </div>
    </div>
  )

  const renderProduct = (id) => {
    const p = products.find((x) => x.id === id)
    if (!p) return <div className="container">Product not found</div>
    return (
      <div className="container">
        <button className="back" onClick={() => (window.location.hash = '')}>
          ← Back
        </button>
        <div className="product-detail">
          <img src={p.image} alt={p.name} />
          <div className="product-info">
            <h2>{p.name}</h2>
            <p className="price">₹{p.price}</p>
            <p>{p.description}</p>
            <button onClick={() => addToCart(p)}>Add to cart</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header cart={cart} onRemove={removeFromCart} onClear={clearCart} onCheckout={() => alert('Mock checkout — integrate payments for production')} />
      <main>
        {route.startsWith('#/product/') ? renderProduct(route.replace('#/product/', '')) : renderHome()}
      </main>
    </div>
  )
}
