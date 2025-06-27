import React from 'react'
import { useState } from 'react';

export const UserManagement = () => {

    const users=[
        {
            _id: "1",
            name: "John Doe",
            email: "juhn@expalme.com",
            role: "admin",
        }
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Costomer",// Default role

    });
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // reset form data after submission
        console.log("User added:", formData);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "Customer", // Reset to default role
        });
    };

    const handleRoleChange = (userId, newRole) => {
        console.log(`User ID: ${userId}, New Role: ${newRole}`);
    };

    const handleDeleteUser = (userId) => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            // Logic to delete user 
        console.log(`User with ID ${userId} deleted`);
        }
    }




  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>User Mangement</h2>
        {/* add new user form */}
        <div className='p-6 rounded-lg mb-6'>
            <h3 className='text-lg font-bold mb-4'>Add New User</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input type="text" name="name" value={formData.name}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded mb-4'
                    />
                </div>
                 <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input type="email" name="email" value={formData.email}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded mb-4'
                    />
                </div>
                 <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input type="password" name="password" value={formData.password}
                    onChange={handleChange}
                    className='w-full p-2 border border-gray-300 rounded mb-4'
                    />
                </div>
                 <div className='mb-4'>
                    <label className='block text-gray-700'>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange}
                    className='w-full p-2 border rounded'
                    >
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                    Add User
                </button>
            </form>
        </div>
        {/* user Lint management */}
        <div className='overflow-x-auto shadow-sm sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-3 px-4'>Name</th>
                        <th className='py-3 px-4'>Email</th>
                        <th className='py-3 px-4'>Role</th>
                        <th className='py-3 px-4'>Actions</th>
                    </tr>
                </thead>
                                            <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                <th className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</th>

                                <td className="py-3 px-4">{user.email}</td>

                                <td className="p-4">
                                    <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="border rounded px-2 py-1"
                                    >
                                    <option value="admin">Admin</option>
                                    <option value="customer">Customer</option>
                                    </select>
                                </td>

                                <td className="py-3 px-4">
                                    {/* <button className="text-blue-500 hover:underline mr-2">Edit</button> */}
                                    <button
                                     onClick={(() => handleDeleteUser(user._id))}
                                     className="text-red-500 hover:underline">Delete</button>
                                </td>
                                </tr>
                            ))}
                            </tbody>

            </table>
        </div>
    </div>
  )
}
