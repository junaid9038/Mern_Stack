import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Products/GenderCollection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'

const placeholderPorducts = [
  {
    _id : 1,
    name: "product 1",
    price : 100,
    image : [{url : "https://picsum.photos/500/500?random=2001"}]
  },
  {
    _id : 2,
    name: "product 2",
    price : 100,
    image : [{url : "https://picsum.photos/500/500?random=2002"}]
  },
  {
    _id : 3,
    name: "product 3",
    price : 100,
    image : [{url : "https://picsum.photos/500/500?random=2003"}]
  },
  {
    _id : 4,
    name: "product 4",
    price : 100,
    image : [{url : "https://picsum.photos/500/500?random=2004"}]
  },
  {
    _id : 5,
    name: "product 1",
    price : 100,
    image : [{url : "https://picsum.photos/500/500?random=2005"}]
  },
  {
    _id : 6,
    name: "product 2",
    price : 100,
    image : [{url : "https://picsum.photos/500/500?random=2006"}]
  },
  {
    _id : 7,
    name: "Style Fashion",
    price : 100,
    image : [{url : "https://picsum.photos/500/500?random=2007"}]
  },
  {
    _id : 8,
    name: "style world",
    price : 790,
    image : [{url : "https://picsum.photos/500/500?random=2008"}]
  },
]

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>
      {/* Best Seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller </h2>
      <ProductDetails/>

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wear for Women
        </h2>
        <ProductGrid products={placeholderPorducts} />
      </div>
    </div>
  )
}

export default Home
