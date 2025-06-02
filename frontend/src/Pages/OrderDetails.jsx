import React, { use } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const OrderDetails = () => {
    const {id} = useParams();
    const [OrderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const mockOrderDetais ={
            _id:id,
            createdAt:new Date(),
            isPaid:true,
            isDelivered:false,
            paymentMethod:"PayPal", 
            shippingMethod:"Standard",
            shippingAddress:{city:"Kolkata",address:"123 Main St",pincode:"700001",state:"West Bengal",country:"India"},
            orderItems:[
                {
                    productId:"1",
                    name:"T-shirt",
                    color:"Red",
                    size:"M",   
                    price: 550, 
                    quantity: 1,
                    image: "https://picsum.photos/200?random=1"
                },
                {
                    productId:"2",
                    name:"Shirt",
                    color:"Blue",
                    size:"L",   
                    price: 499, 
                    quantity: 1,
                    image: "https://picsum.photos/200?random=2"
                },
            ],
        };
        setOrderDetails(mockOrderDetais);
    }, [id]);

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
        {!OrderDetails ? (
            <p>NO Order Details found</p>
        ):(
            <div className='p-4 sm:p-6 rounded-lg border'>
                {/* Order Info */}
                <div className='flex flex-col sm:flex-row justify-between mb-8'>
                    <div>
                        <h3 className=' text-lg md:text-xl font-semibold'>Order ID :#{OrderDetails._id}</h3>
                        <p className='text-gray-600'> {new Date(OrderDetails.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                        <span className={`${OrderDetails.isPaid ? "bg-green-100 text-green-700":"bg-red-100 text-red-700"}
                        px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                            {OrderDetails.isPaid ? "Approved" : "Pending"}
                        </span>
                        <span className={`${OrderDetails.isDelivered ? "bg-green-100 text-green-700":"bg-red-100 text-yellow-700"}
                        px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                            {OrderDetails.isDelivered ? "Delivered" : "pendingn Delivery"}
                        </span>
                    </div>
                </div>
                {/* customer,Payment,shipping Info */}
                <div className='grid grid-cols-1 sm:grid-cols-2 mb:grid-cols-3 gap-8 mb-8'>
                    <div >
                        <h2 className='text-lg font-semibold mb-2'>Payment Info</h2>
                        <p className='text-gray-600'>Method: {OrderDetails.paymentMethod}</p>
                        <p>Status: {OrderDetails.isPaid ? "paid" : "Unpaid"}</p>
                    </div>
                    <div >
                        <h2 className='text-lg font-semibold mb-2'>Shipping Info</h2>
                        <p className='text-gray-600'>Shapping Method: {OrderDetails.shippingMethod}</p>
                        <p>Address:{" "} {`${OrderDetails.shippingAddress.city},${OrderDetails.shippingAddress.country}`}</p>
                    </div>
                </div>
                {/* Prodrct list */}
                <div className='overflow-x-auto'>
                    <h4 className='text-lg font-semibold mb-4'>Products</h4>
                    <table className='min-w-full text-gray-600 mb-4'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='py-2 px-2'>Name</th>
                                <th className='py-2 px-2'>Unit Price</th>
                                <th className='py-2 px-2'>Quantity</th>
                                <th className='py-2 px-2'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {OrderDetails.orderItems.map((item) => (
                                <tr key={item.productId} className='border-b'>
                                    <td className='py-2 px-4 flex items-center'>
                                        <img src={item.image} alt={item.name}
                                        className='w-12 h-12 object-cover rounded-lg mr-4'
                                        />

                                      <Link to={`/Product/${item.productId}`}
                                          className="text-blue-500 hover:underline">
                                        {item.name}
                                    </Link>
                                    </td>  
                                    <td className='py-2 px-4'>₹{item.price}</td>
                                    <td className='py-2 px-4'>{item.quantity}</td>      
                                    <td className='py-2 px-4'>₹{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                {/* Back to Orders Link */}
                <Link to="/my-orders" className='text-blue-500 hover:underline'>
                Back to My Order 
                </Link>
            </div>
        )}
    </div>
  )
}
