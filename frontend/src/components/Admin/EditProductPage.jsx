import React, { use, useState } from 'react'

export const EditProductPage = () => {

    const [productDate, setProductData] = useState({
        name: "",   
       discription: "",
       price: 0,
       countInStock: 0,
       sku: "",
       category: "",    
       brand: "",
       size: [],
       colors: [],
       collection: "",
       material:"",
       gender:"",
       images: [
        {
            url: "https://picsum.photos/150?random=1",
        },
        {
            url: "https://picsum.photos/150?random=2",
        },
        {
            url: "https://picsum.photos/150?random=3",
        },
        {
            url: "https://picsum.photos/150?random=4",
        }
       ],
    });

    const handleChange = (e) => {

        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Product data submitted:", productDate);
    }


  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
        <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
        <form onSubmit={handleSubmit} >
            {/* Name */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Product Name</label>
                <input type="text" 
                name='name' 
                value={productDate.name}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />
            </div>
            {/* Description */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Discpription</label>
                <textarea 
                name='discription'
                value={productDate.discription}
                className='w-full border border-gray-300 rounded-md p-2'
                rows={4}
                required
                onChange={handleChange}
                />
            </div>
            {/* Price */}
            <div className='mb-6'>  
                <label className='block font-semibold mb-2'>Price</label>
                <input type="number" 
                name='price' 
                value={productDate.price}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />
            </div>
            {/* Count In Stock */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Count In Stock</label>
                <input type="number" 
                name='countInStock' 
                value={productDate.countInStock}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />    
            </div>
            {/* SKU */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>SKU</label>
                <input type="text" 
                name='sku' 
                value={productDate.sku}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />    
            </div>
            {/* Category */}
            <div className='mb-6'>  
                <label className='block font-semibold mb-2'>Category</label>
                <input type="text" 
                name='category' 
                value={productDate.category}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />
            </div>
            {/* Brand */}
            <div className='mb-6'>  
                <label className='block font-semibold mb-2'>Brand</label>
                <input type="text" 
                name='brand' 
                value={productDate.brand}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />
            </div>
            {/* Size */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Sizes (Comma-separeted)</label>
                <input type="text" 
                name='size' 
                value={productDate.size.join(", ")} // Assuming size is an array
                onChange={(e) =>
                    setProductData({
                        ...productDate,
                        size: e.target.value.split(",").map(size => size.trim())
                    })
                }
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />
            </div>
            {/* Colors */}
            <div className='mb-6'>      
                <label className='block font-semibold mb-2'>Colors (Comma-separeted)</label>
                <input type="text" 
                name='colors' 
                value={productDate.colors.join(", ")} // Assuming colors is an array
                onChange={(e) =>
                    setProductData({
                        ...productDate,
                        colors: e.target.value.split(",").map(color => color.trim())
                    })
                }
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />
            </div>

            {/* image */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Upload Image</label>
                <input type="file" onChange={handleImageUpload}/>
                <div className='flex gap-4 mt-4'>
                    {productDate.images.map((image,index)=>(
                        <div key={index}>
                            <img
                                src={image.url} 
                                alt={image.altText || "Product Image"} 
                                className='w-24 h-24 object-cover rounded-md'
                            />
                        </div>
                    ))}
                </div>
            </div>


            {/* Collection */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Collection</label>
                <input type="text" 
                name='collection' 
                value={productDate.collection}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-md p-2'
                required
                  />
            </div>
            
          <div>
            <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md
            hover:bg-green-600 transition duration-200 ease-in-out'
            > Upload Product</button>
          </div>
        </form>
    </div>
  )
}
