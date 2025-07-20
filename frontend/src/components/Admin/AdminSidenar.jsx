import React, { use } from 'react'
import { FaBoxOpen, FaClipboard, FaSign, FaSignOutAlt, FaStore } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const AdminSidenar = () => {
    const navigate = useNavigate();
    const handleLogout =()=>{
         navigate('/');
    }
  return (
    <div className='p-6'>
        <div className='mb-6'>
            <Link to='/admin' className="text-2xl font-medium">Garbline</Link>
        </div>
        <h2 className='text-xl font-medium mb-6 text-center'>Admin Dashboard</h2>
         <nav>
            <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive
                        ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
                    }
                    >
                    <span>👤</span> {/* Replace with icon if using one, like <FaUser /> */}
                    <span>Users</span>
            </NavLink>
            <NavLink
                    to="/admin/Products"
                    className={({ isActive }) =>
                        isActive
                        ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
                    }
                    >
                    <FaBoxOpen/> {/* Replace with icon if using one, like <FaUser /> */}
                    <span>Products</span>
            </NavLink>
            <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive
                        ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
                    }
                    >
                    <FaClipboard/> {/* Replace with icon if using one, like <FaUser /> */}
                    <span>Order</span>
            </NavLink>
            <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                        ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
                    }
                    >
                    <FaStore/> {/* Replace with icon if using one, like <FaUser /> */}
                    <span>Shop</span>
            </NavLink>
         </nav>
         <div className='mt-6'>
            <button onClick={handleLogout} className='w-full bg-red-500 text-white py-2 px-4 rounded flex items-center
            justify-center space-x-2'>
                <FaSignOutAlt />
                <span>Logout</span>
            </button>
         </div>
    </div>
  )
}

export default AdminSidenar