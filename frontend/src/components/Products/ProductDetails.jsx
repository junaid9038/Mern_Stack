import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';

const selectedProoduct = {
  name:"Stylesh Jacket",
  price : 120,
  orginalPrice :169,
  description : "This ia a stylish jacket perfect for any occasion",
  brand : "Garbline",
  material : "cotton Lycra",
  sizes : ["S","M","L","XL"],
  colors : ["Red","Black","gray"],
  images : [{
    url : "https://picsum.photos/500/500?random=12",
    altText: "Style Inspired by You",
  },
  {
    url : "https://picsum.photos/500/500?random=11",
    altText: "Garbline new Arival",
  },
  {
    url : "https://picsum.photos/500/500?random=2000",
    altText: "Garbline new Arival",
  }
]
}

const similarProducts = [
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
 
]

const ProductDetails = () => {
  const [mainImage,setMainImage] = useState("");
  const [selelctSize,SetSelectSize] = useState("");
  const [selectColor , SetSelectColor] = useState("")
  const [quantity , SetQuantity] = useState(1);
  const [isButtonDisable, SetISButtonDisable] = useState(false)

  useEffect(()=>{
    if (selectedProoduct?.images?.length >0){
      setMainImage(selectedProoduct.images[0].url);
    }
  },[selectedProoduct]);

  const handleQuantityChange = (action)=>{
    if (action === 'plus') SetQuantity((prev) => prev+1);
    if (action === 'minus' && quantity >1) SetQuantity((prev) => prev -1);
  }

  const handleAddToCart = () =>{
    if (!selectColor || !selelctSize){
      toast.error("Please select a size and color befor adding to cart.",{
        duration:1000,
      });
      return;
    }
    SetISButtonDisable(true);

    setTimeout(()=>{
      toast.success("Product added to cart!",{
        duration:1000,
      });
      SetISButtonDisable(false);
    },500)
  }


  return (
    <div className='p-6'>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                {/* left Thumbnails */}
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                    {selectedProoduct.images.map((image,index) =>(
                      <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`}
                       className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" :"border-gray-300"}`}
                       onClick={()=>setMainImage(image.url)}
                      />
                    ))}
                </div>
                {/* Main Image */}
                <div className='md:w-1/2'>
                  <div className='mb-4'>
                     <img src={mainImage} 
                      alt="Main Product"
                      className='w-full h-auto object-cover rounded-lg'
                     />
                  </div>
                </div>
                {/* Mobile thumnails  */}
                <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                {selectedProoduct.images.map((image,index) =>(
                      <img key={index} src={image.url} alt={image.altText || `Thumbnail ${index}`}
                       className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" :"border-gray-300"}`}
                       onClick={()=>setMainImage(image.url)}
                      />
                    ))}
                </div>
                {/* Right side */}
                <div className='md:w-1/2 md:ml-10'>
                <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                  {selectedProoduct.name}
                </h1>
                <p className='text-lg text-gray-600 mb-1 line-through'>
                  {selectedProoduct.orginalPrice && `₹${selectedProoduct.orginalPrice}`}
                </p>
                <p className='text-xl text-gray-500 mb-2'>
                ₹{selectedProoduct.price}

                </p>
                <p className='text-gray-600 mb-4'>
                     {selectedProoduct.description}
                </p>
                <div className='mb-4'>
                  <p className='text-gray-700'>Color :</p>
                  <div className='flex gap-2 mt-2'>
                    {selectedProoduct.colors.map((color) =>(
                      <button 
                      key={color}
                      onClick={()=> SetSelectColor(color)}
                      className={`w-8 h-8 rounded-full border ${selectColor === color? "border-4 border-black" : "border-gray-300"}`}
                      style={{backgroundColor:color.toLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                      
                      >

                      </button>
                    ))}
                  </div>
                </div>
                <div className='mb-4'>
                  <p className='text-gray-700'>Size :</p>
                   <div className='flex gap-2 mt-2'>
                    {selectedProoduct.sizes.map((size) =>(
                      <button 
                      key={size} 
                      onClick={()=> SetSelectSize(size)}
                      className={`px-4 py-4 rounded border ${selelctSize === size ? "bg-black text-white" : ""}`}>
                        {size}
                      </button>
                    ))}

                   </div>
                </div>
                <div className='mb-6'>
                  <p className='text-gray-700'>Quantity</p>
                  <div className='flex items-center space-x-4 mt-2'>
                    <button
                     onClick={()=> handleQuantityChange("minus")}
                     className='px-2 py-1 bg-gray-200 rounded text-lg'>
                      -
                    </button>
                    <samp className='text-lg'>{quantity}</samp>
                    <button 
                    onClick={()=> handleQuantityChange("plus")}
                    className='px-2 py-1 bg-gray-200 rounded text-lg'>
                      +
                    </button>
                  </div>
                </div>
                <button
                 onClick={handleAddToCart}
                 disabled = {isButtonDisable}
                 className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                  isButtonDisable
                  ?"corsor-not-allowed opacity-50"
                  :"hover:bg-gray-900"
                 }`}>
                  {isButtonDisable ? "Adding..." :"ADD TO CART"}
                </button>
                <div className='mt-10' text-gray-700>
                  <h3 className='text-xl font-bold mb-4'>Characheristics:</h3>
                  <table className='w-full text-left text-sm text-gray-600'>
                    <tr>
                      <td className='py-1'>Brand</td>
                      <td className='py-1'>{selectedProoduct.brand}</td>

                    </tr>
                    <tr>
                      <td className='py-1'>Material</td>
                      <td className='py-1'>{selectedProoduct.material}</td>

                    </tr>
                  </table>
                </div>
              </div>
            </div>
      </div>
      <div className="mt-20">
        <h2 className='text-2xl text-center font-medium mb-4'>
          You May Also Like
        </h2>
        <ProductGrid products={similarProducts}/>
      </div>

    </div>
  )
}

export default ProductDetails;