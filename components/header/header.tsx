"use client"
import Link from 'next/link'
import React from 'react'
import { Menu } from './Menu'

const Header = () => {
  return (
   <header>
    <nav>
        <div className='navbar justify-between bg-base-300'>
            <Link className='btn btn-ghost rounded-btn text-lg' href='/'>Shopify</Link>
            <Menu/>
        </div>
    </nav>
   </header>
  )
}

export default Header