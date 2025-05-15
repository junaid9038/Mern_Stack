import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        category:"",
        gender:"",
        color:"",
        size:[],
        material:[],
        brand:[],
        minPrice:0,
        maxPrice:5000,
    });

    const [priceRange, setPriceRange] = useState([0, 5000]);
    const category = ["Top Wear","Bottom Wear"]
    const color = ["Red","Blue","Green","Black","White"]
    const size = ["S","M","L","XL","XXL"]
    const material = ["Cotton","Polyester","Wool"]
    const brand = ["Garblien"] 
    const gender = ["Men","Women"]

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        //{category:"Top wear',maxprice:5000} = params.category
        setFilters({
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],    
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0, 
            maxPrice: params.maxPrice || 5000,
        });
        setPriceRange(0,params.maxPrice || 5000);
    }, [searchParams]);


  return (
    <div className='p-4'>
        <h3 className='text=xl font-medium text-gray-800 mb-4'>Filter</h3>

        {/* Category Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Category</label>
            {category.map((category)=>(
                <div key={category} className='flex items-center mb-1'>
                    <input type="radio"
                    name='category'
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-700'>{category}</span>
                </div>
            ))}

        </div>



        {/* gender Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Gender</label>
            {gender.map((gender)=>(
                <div key={gender} className='flex items-center mb-1'>
                    <input type="radio"
                    name='category'
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-700'>{gender}</span>

                </div>

            ))}

        </div>




    
    </div>
  )
}

export default FilterSidebar




