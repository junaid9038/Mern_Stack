import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 '>
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className='block'>
          <div className='bg-white p-4 rounded-lg shadow'>
            <div className='w-full h-96 mb-4'>
              <img
                src={product.image[0].url}
                alt={product.image[0].altText || product.name}
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
            <h2 className='text-sm font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid
