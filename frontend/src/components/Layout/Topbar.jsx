import React from 'react'
import {TbBrandMeta} from "react-icons/tb";
import {IoLogoInstagram} from "react-icons/io";
import {RiTwitterXLine} from "react-icons/ri"

const Topbar = () => {
  return (
    <div className='bg-rabbit-red text-white'>
        <div className='container mx-auto flex justify-between items-center py-3 px-4'>
            <div className='hidden md:flex iten-center space-x-4'>
                <a href="https://www.facebook.com/profile.php?id=61569553637505" target='_blank' className='hover:text-gray-300'>
                    <TbBrandMeta className="h-5 w-5"/>
                </a>
                <a href="https://www.instagram.com/garbline2024/" target='_blank' className='hover:text-gray-300'>
                    <IoLogoInstagram className="h-5 w-5"/>
                </a>
                <a href="https://www.linkedin.com/in/garbline-india-5745aa335/" target='_blank' className='hover:text-gray-300'>
                    <RiTwitterXLine className="h-5 w-5"/>
                </a>
            </div>
            <div className='text-sm text-center flex-grow'>
                <span> Style Inspired by You</span>
            </div>
            <div className='text-sm hidden md:block'>
                <a href="tel:+1234567890" className='hover:text-gray-300'>
                    +91 8910044287
                </a>

            </div>
        </div>

    </div>
  )
}

export default Topbar
