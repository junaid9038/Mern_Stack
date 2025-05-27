import React, { use, useEffect, useRef } from 'react'
import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {

    const [products,setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);
    const toggleSidebar = () =>{
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleClicOutside = (e) =>{
        // close the sidebar if clicked outside
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setIsSidebarOpen(false);
        }
    }

    useEffect(()=>{
        // add event listner for clicks
        document.addEventListener("mousedown",handleClicOutside);
        // cleanup the event listner

        return () =>{
            // remove event listner for clicks
            document.removeEventListener("mousedown",handleClicOutside);
        };
    
        // document.removeEventListener("mousedown",handleClicOutside);   
    },[]);
    useEffect(()=>{
        setTimeout(()=>{
            const fetchCollection = [
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
              ];
            setProducts(fetchCollection);
        },1000);
    },[])
  return (
    <div className='flex flex-col lg:flex-row'>
      {/* Mobile filter button  */}
      <button onClick={toggleSidebar}
       className='lg:hidden border p-2 flex justify-center items-center'>
        <FaFilter className='mr-2'/>
      </button>
      {/* filter sidebar */}
      <div ref={sidebarRef} 
      className={`${isSidebarOpen ? "translate-x-0":"-translate-x-full"} fixed inset-y-0 left-0 w-64 overflow-y-auto bg-white  transform transition-transform duration-300 z-50 lg:static lg:translate-x-0`}>
        <FilterSidebar/>
      </div>
      <div className='flex-grow p-4'>
        <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
        {/* sort Options */}
        <SortOptions/>

        {/* Prodect Grid */}
        <ProductGrid products={products}/>  
      </div>
    </div>
  )
}

export default CollectionPage
