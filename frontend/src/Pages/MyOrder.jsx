import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const MyOrder = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulating network delay
        const timeout = setTimeout(() => {
          const mockOrders = [
            {
              _id: 6766,
              createdAt: new Date(),
              shippingAddress: {
                address: "123 Main St",
                city: "New York",
                state: "NY",
                country: "USA",
                postalCode: "10001"
              },
              orderItems: [
                {
                  product: {
                    name: "Product 1",
                    image: [{ url: "https://picsum.photos/500/500?random=2001" }],
                    price: 100
                  },
                  quantity: 2,
                  price: 200
                }
              ],
              totalPrice: 400,
              isPaid: true,
            },
            {
              _id: 6756,
              createdAt: new Date(),
              shippingAddress: {
                address: "123 Main St",
                city: "New York",
                state: "NY",
                country: "USA",
                postalCode: "10001"
              },
              orderItems: [
                {
                  product: {
                    name: "Product 2",
                    image: [{ url: "https://picsum.photos/500/500?random=2006" }],
                    price: 100
                  },
                  quantity: 2,
                  price: 200
                }
              ],
              totalPrice: 400,
              isPaid: true,
            },
          ];
          setOrders(mockOrders);
        }, 1000);
    
        // return () => clearTimeout(timeout);
      }, []);
    

  const handleRowClick = (orderId) => {
       navigate(`/order/${orderId}`);
  }

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-xl sm:text:2xl font-bold mb-6'>My order</h2>
         <div className='relative shadow-md sm:rounded-md overflow-hidden'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <td className='py-2 px-4 sm:py-3'>Image</td>
                        <td className='py-2 px-4 sm:py-3'>Order Id</td>
                        <td className='py-2 px-4 sm:py-3'>Created</td>
                        <td className='py-2 px-4 sm:py-3'>Shapping Address</td>
                        <td className='py-2 px-4 sm:py-3'>Items</td>
                        <td className='py-2 px-4 sm:py-3'>Price</td>
                        <td className='py-2 px-4 sm:py-3'>stats</td>
            
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} 
                        onClick={() => handleRowClick(order._id)} 
                        className='border-b'>
                            <td className='py-2 px-4 sm:py-3'>
                                <img src={order.orderItems[0].product.image[0].url} alt={order.orderItems[0].product.name} className='w-16 h-16 object-cover' />
                            </td>
                            <td className='py-2 px-4 sm:py-3 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
                            <td className='py-2 px-2 sm:py-4 sm:px-4'>{new Date(order.createdAt).toLocaleDateString()}{" "}
                            {new Date(order.createdAt).toLocaleTimeString()}
                            </td>
                            <td className='py-2 px-4 sm:py-3'>{`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.postalCode}`}</td>
                            <td className='py-2 px-4 sm:py-3'>{order.orderItems.length}</td>
                            <td className='py-2 px-4 sm:py-3'>₹{order.totalPrice}</td>
                            <td className='py-2 px-4 sm:py-3'>
                                <span className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} `}>
                                    {order.isPaid ? "Paid" : "Pending"}
                                </span>
                                </td>

                            {/* <td className='py-2 px-4 sm:py-3'>{order.isPaid ? "Paid" : "Not Paid"}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
    </div>
  )
}

export default MyOrder
