import React from 'react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <a className="thumb" href={`#/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </a>
      <div className="card-body">
        <h3><a href={`#/product/${product.id}`}>{product.name}</a></h3>
        <p className="price">₹{product.price}</p>
        <button onClick={onAdd}>Add to cart</button>
      </div>
    </div>
  )
}
