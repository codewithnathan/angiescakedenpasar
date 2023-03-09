import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
const { motion } = require('framer-motion')


import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { formatWithValidation } from 'next/dist/shared/lib/utils';
const rp = require('rupiah-format')

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const [text, setText] = useState([])

  const handleCheckout = () => {
    let products = {
      names: [],
      subtotal: ''
    }
    cartItems.map(item => {
      const { name, quantity } = item
      products.names.push(...name, ' ', quantity, ', ')
      products.subtotal = rp.convert(totalPrice)
    })

    const phone = '6281805547477'
    let text = `Saya mau order : ${products.names.join('')}Totalnya : ${products.subtotal}`

    window.location.href = `https://api.whatsapp.com/send/?phone=${phone}&text=${text}`
  }

  // const handleCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch('/api/stripe', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(cartItems),
  //   });

  //   if (response.statusCode === 500) return;

  //   const data = await response.json();

  //   toast.loading('Redirecting...');

  //   stripe.redirectToCheckout({ sessionId: data.id });
  // }

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white fixed right-0 top-0 z-20" ref={cartRef}>
      < div className="h-screen w-80 float-right bg-white px-5 py-8" >
        <button
          type="button"
          className="flex items-center cursor-pointer gap-1 ml-3 border-0"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft size={18} strokeWidth={20} />
          <span className="ml-3 text-xl font-semibold">Your Cart</span>
          <span className="ml-1 text-sm">({totalQuantities} items)</span>
        </button>

        {
          cartItems.length < 1 && (
            <div className="text-center">
              <img src='https://phanox.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshopping-bag.a3abe833.webp&w=640&q=75' />
              <h3 className='text-xl'>Your shopping bag is empty</h3>
              <Link href="/">
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="mt-5 w-full bg-black text-white text-lg py-3"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )
        }

        <div className="flex flex-col gap-4 w-full mt-5 overflow-y-auto h-96 scrollbar-hide items-start">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="flex w-full items-center gap-4 border-b pb-4" key={item._id}>
              <img src={urlFor(item?.image[0])} className="w-24 h-24 rounded-xl bg-gray-100" />
              <div className='w-full space-y-1'>
                <div className="flex flex-col justify-between w-full">
                  <h5 className='text-lg line-clamp-1'>{item.name}</h5>
                  <h4 className='text-lg font-bold'>{rp.convert(item.price)}</h4>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="border border-black flex items-center py-0.5">
                      <span className='pl-2' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                        <AiOutlineMinus size={15} strokeWidth={50} />
                      </span>
                      <span className="px-3 text-lg">{item.quantity}</span>
                      <span className="pr-2" onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus size={15} strokeWidth={50} /></span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {
          cartItems.length >= 1 && (
            <div className='absolute bottom-5 w-full right-0 px-5'>
              <div className="flex justify-between text-lg my-4">
                <h3>Subtotal:</h3>
                <h3 className='font-semibold'>{rp.convert(totalPrice)}</h3>
              </div>
              <div className="w-full">
                <button type="button" className="w-full bg-black text-white text-lg py-2.5" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          )
        }
      </div >
    </motion.div >
  )
}

export default Cart