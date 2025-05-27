import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

const FilterSidebar = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
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
    const color = ["Red","Blue","Green","Black","White","Yellow","Pink","Purple","Orange"]
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

    const handleFilterChange = (e) => {
        const {name,value,checked,type} =  e.target;
        // console.log(name,value,checked,type)
        let newFilters = {...filters};
        if(type === "checkbox"){
            if(checked){
                newFilters[name] = [...newFilters[name],value];
            }else{
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        }
        else{
            newFilters[name] = value;
        }
        setFilters(newFilters);
        updateURLparams(newFilters);
        console.log(newFilters);
    }

    const updateURLparams = (newFilters) => {
        const params = new URLSearchParams();
        // catagory: "Top wear", size:["S","M"]
        Object.keys(newFilters).forEach((key) => {
            if(Array.isArray(newFilters[key] && newFilters[key].length > 0)){
                params.set(key, newFilters[key].join(","));
        }else if(newFilters[key]){
            params.set(key, newFilters[key]);
        }
      });
      setSearchParams(params);
      navigate(`?${params.toString()}`); // ?catagory=Bottom+Wear&size=S%2CS
    }

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice]);
        const newFilters = {
            ...filters,
            minPrice: 0,
            maxPrice: newPrice,
        };
        setFilters(newFilters);
        updateURLparams(newFilters);
    }


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
                    value={category}
                    onClick={handleFilterChange}
                    checked={filters.category === category}
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
                    name='gender'
                    value={gender}
                    onClick={handleFilterChange}
                    checked={filters.gender === gender}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-700'>{gender}</span>

                </div>

            ))}
        </div>
        {/* Color Filter */}    

        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Color</label>
            <div className='flex flex-wrap gap-2'>
                {color.map((color)=>(
                    <button
                      key={color}  
                        name='color'
                        value={color}
                        onClick={handleFilterChange}
                        className ={`w-8 h-8 rounded-full border-gray-300 cursor-pointer transition hover:scale-105
                        ${filters.color === color ? "ring-2 ring-blue-300" : " "}`}
                        style={{backgroundColor: color.toLowerCase()}}>
                     </button>  
                    
                ))}
            </div>
        </div>

        {/* Size Filter */} 
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Size</label>
            {size.map((size)=>(
                <div key={size} className='flex items-center mb-1'>
                    <input type="checkbox"
                    name='size'
                    value={size}
                    onClick={handleFilterChange}
                    checked={filters.size.includes(size)}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-700'>{size}</span>
                </div>
            ))} 
        </div>

    
      {/* Material Filter */} 
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Material</label>
            {material.map((material)=>(
                <div key={material} className='flex items-center mb-1'>
                    <input type="checkbox"
                    name='material'
                    value={material}
                    onClick={handleFilterChange}
                    checked={filters.material.includes(material)}
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-700'>{material}</span>
                </div>
            ))}
        </div>

        {/* Brand Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Brand</label>
            {brand.map((brand)=>(
                <div key={brand} className='flex items-center mb-1'>
                    <input type="checkbox"
                    name='brand'
                    value={brand} 
                    checked={filters.brand.includes(brand)}
                    onClick={handleFilterChange}  
                    className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300' />
                    <span className='text-gray-700'>{brand}</span>
                </div>
            ))}
        </div>
        {/* Price Range Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
            <input type="range" 
            name='priceRange'
            min={0} 
            max={5000} 
            value={priceRange[1]} 
            onChange={handlePriceChange}
            className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />
            
            <div className='flex justify-between text-gray-600 mt-2'>
                <span>₹0</span>
                <span>₹{priceRange[1]}</span>
                
            </div>
        </div>




    
    </div>
  )
}

export default FilterSidebar




