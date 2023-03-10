import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
const { motion } = require('framer-motion')
import rupiahFormat from 'rupiah-format';

const HeroBanner = ({ banner }) => {
  return (
    <div className="relative bg-center bg-cover w-full h-fit bg-gradient shadow-2xl shadow-indigo-100">
      <section className="relative pt-28 pb-16">
        <div className="mx-auto px-8 max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto sm:max-w-4xl sm:items-center sm:grid-cols-2 gap-y-12 lg:gap-x-8">
            <div>
              <motion.img
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-3/4 mx-auto rounded-2xl" src={urlFor(banner.image[0])} alt={banner.name} />
            </div>
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center sm:text-left space-y-6">
              <motion.h1
                className="text-gray-900 text-5xl font-bold sm:leading-tight lg:leading-tight lg:text-6xl">{banner.name}</motion.h1>
              <motion.p
                className="text-3xl sm:my-8">{rupiahFormat.convert(banner.price)}</motion.p>
              <Link href={`/product/${banner.slug.current}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button" className="mt-6 inline-flex px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg ring-0 hover:ring-pink-200 hover:ring-4">Buy Now</motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default HeroBanner