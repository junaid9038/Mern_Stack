import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        searchParams.set("sortby", sortBy);
        setSearchParams(searchParams);
    };

    return (
        <div className='mb-4 flex items-center justify-end'>
            <select
                id="Sort"
                className='border p-2 rounded-md focus:outline-none'
                onChange={handleSortChange}
                value={searchParams.get("sortby") || "default"}
            >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
               
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
            </select>
        </div>
    );
};

export default SortOptions;
