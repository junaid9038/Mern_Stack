import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Payment from './Payment';





const cart = {
    products :[
    {
        
        name : "T-shirt",
        size : "M",
        color : "Red",
        Price : 550,
        image : 'https://picsum.photos/200?random=1'
    },
    {
    
        name : "T-shirt",
        size : "M",
        color : "Red",
        Price : 550,
        image : 'https://picsum.photos/200?random=4'
    },
  ],
  totalPrice : 1100,
}


const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId,setCheckoutId] = useState(null);
    const [shippingAddress,setShippingAddress] = useState({
        firstName : "",
        lastName : "",
        address : "",
        city : "",
        pincode : "",
        state : "",
        country : "",
        phone : "",
    });

    const handleCreateCheckout = (e) =>{
        e.preventDefault()
        setCheckoutId(1235)
    }

    const handlePaymentSuccess = (details) =>{
        console.log("Payment Success",details);
        // Handle success logic here
        // For example, you can redirect to a success page or show a success message
        alert("Payment Successful");
        navigate("/order-confirmation");
    }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl ax-auto py-10 px-6 tracking-tighter'>
        {/* Left Section */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl uppercase mb-6'>CheckOut</h2>
        <form onSubmit={handleCreateCheckout}>
            <h3 className='text-lg mb-4'>Contact Details</h3>
            <div className='mb-4'>
                <label className='block text-gray-700'>Email</label>
                <input type="email"
                value='user@garbline.com'
                className='w-full p-2 border rounded'
                disabled />
            </div>
            <h3 className='text-lg mb-4'>Delivery</h3>
            <div className='mb-4 grid grid-cols-2 gap-4'>
                <div>
                    <label className='block text-gray-700'>First Name</label>
                    <input type="text" 
                    value={shippingAddress.firstName}
                    onChange={(e) => setShippingAddress({...shippingAddress,firstName:e.target.value,})}
                    className='w-full p-2 border rounded'/>
                </div>
                <div>
                    <label className='block text-gray-700'>Last Name</label>
                    <input type="text" 
                    value={shippingAddress.lastNameName}
                    onChange={(e) => setShippingAddress({...shippingAddress,lastName:e.target.value,})}
                    className='w-full p-2 border rounded'/>
                </div>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700'>Address</label>
                <input type="text" 
                value={shippingAddress.address}
                onChange={(e)=>setShippingAddress({...setShippingAddress,address:e.target.value})}
                className='w-full p-2 border rounded'
                required/>
            </div>
            <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
                    <label className='block text-gray-700'>City</label>
                    <input type="text" 
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({...shippingAddress,city:e.target.value,})}
                    className='w-full p-2 border rounded'/>
                </div>
                <div>
                    <label className='block text-gray-700'>Pincode</label>
                    <input type="text" 
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({...shippingAddress,pincode:e.target.value,})}
                    className='w-full p-2 border rounded'/>
                </div>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700'>Country</label>
                <input type="text" 
                value={shippingAddress.country}
                onChange={(e)=>setShippingAddress({...setShippingAddress,country:e.target.value})}
                className='w-full p-2 border rounded'
                required/>
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700'>Phone Numver</label>
                <input type="tel" 
                value={shippingAddress.phone}
                onChange={(e)=>setShippingAddress({...setShippingAddress,phone:e.target.value})}
                className='w-full p-2 border rounded'
                required/>
            </div>
            <div className='mb-6'>
                {!checkoutId ? (
                    <button type='submit' className='w-full bg-black text-white'>Continue to Payment</button>
                ):(
                    <div>
                        <h3 className='text-lg mb-4'>Payment</h3>
                        {/* Payment */}
                        <Payment amount={100} onSuccess ={handlePaymentSuccess} 
                         onError={(err) =>alert("Payment failed.Try Again")}/>
                    </div>
                )}
            </div>
        </form>
      </div>
      {/* Right side */}
      <div className='bg-gray-50 p-6 rounded-lg'>
  <h3 className='text-lg font-semibold mb-4'>Order Summary</h3>
  <div className='border-t py-4 mb-4'>
    {cart.products.map((product, index) => (
      <div key={index} className='flex items-start justify-between py-4 border-b'>
        <div className='flex items-start'>
          <img
            src={product.image}
            alt={product.name}
            className='w-20 h-24 object-cover rounded-md mr-4'
          />
          <div>
            <h4 className='text-md font-medium'>{product.name}</h4>
            <p className='text-sm text-gray-500'>Size: {product.size}</p>
            <p className='text-sm text-gray-500'>Color: {product.color}</p>
          </div>
        </div>
        <div>
          <p className='text-lg font-semibold text-gray-800'>₹{product.Price?.toLocaleString()}</p>
        </div>
      </div>
    ))}
  </div>
  <div className='flex justify-between items-center text-lg  mb-4'>
    <p>SubTotal</p>
    <p className='font-semibold'>₹{cart.totalPrice?.toLocaleString()}</p>
  </div>

  <div className='flex justify-between items-center text-lg'>
    <p>Shipping</p>
    <p>Free</p>
  </div> 
  <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
    <p>Total </p>
    <p>₹{cart.totalPrice?.toLocaleString()} </p>
  </div>
</div>

    </div>
  )
}

export default Checkout
