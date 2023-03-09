import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext } from '../context/StateContext';
const { motion } = require('framer-motion')

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div
      className='flex justify-between items-center py-5 px-6 text-2xl bg-white bg-opacity-20 backdrop-blur-md fixed z-10 w-full'>
      <div>
        <Link href='/'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'tween' }}
            className='cursor-pointer'>
            <img src='./images/logos.png' className='w-12 h-12' />
          </motion.div>
        </Link>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' }}
        className='flex items-center cursor-pointer' onClick={() => setShowCart(true)}>
        <AiOutlineShopping size='30' strokeWidth='20' />
        <span className='bg-red-500 rounded-full w-5 h-5 text-sm text-white flex items-center justify-center'>{totalQuantities}</span>
      </motion.div>
      {showCart && <Cart />}
    </div>

  )
}

export default Navbar