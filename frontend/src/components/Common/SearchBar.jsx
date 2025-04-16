import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { Form } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm,setSearchIerm] = useState("");
    const [isopen,setIsOpen] = useState(false);

    const handleSearchTerm =() =>{
        setIsOpen(!isopen);
    }

    const handleSearch =(e)=>{
        e.preventDefault();
        console.log("Search Term:",searchTerm);
        setIsOpen(false)

    }

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isopen?
        "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      
      {isopen ? (
        <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
            <div className='relative w-1/2'>
               <input 
                 type="text" 
                 placeholder='Search'  
                 value={searchTerm}
                 onChange={(e) => setSearchIerm(e.target.value)}
                 className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700'
               />
               {/* Search Icon */}
               <button
                type='submit'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                <HiMagnifyingGlass className='h-6 w-6'/>
               </button>
              
            </div>
             {/* close button */}
             <button type='button'
                onClick={handleSearchTerm}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                <HiMiniXMark className='h-6 w-6'/>
               </button>
        </form>
      ):(
        <button onClick={handleSearchTerm}>
            <HiMagnifyingGlass className='h-6 w-6'/>
        </button> 
      )}

    </div>
  )
}

export default SearchBar
