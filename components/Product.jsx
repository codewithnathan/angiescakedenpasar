import React from 'react';
import Link from 'next/link';
const rp = require('rupiah-format')

import { urlFor } from '../lib/client';
import product from '@/sanity/schemas/product';
const { motion } = require('framer-motion')

const Product = ({ product: { image, name, slug, price, info, details, kategori } }) => {
  return (
    <Link href={`/product/${slug.current}`}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative group">
        <div className="overflow-hidden aspect-w-1 aspect-h-1 cursor-pointer">
          <img className="object-cover w-full xs:h-80 h-48 transition-all duration-300 scale-100 group-hover:scale-110" src={urlFor(image && image[0])} alt={name} />
        </div>
        <div className="flex items-start justify-between mt-4 space-x-4">
          <div className='text-left w-full'>
            <Link href={`/category/${kategori?.slug?.current}`}>
              <div className='bg-black w-fit text-white px-2 py-0.5 text-xss cursor-pointer'>
                {kategori.name}
              </div>
            </Link>
            <h3 className="text-md font-bold text-gray-900 sm:text-sm md:text-base line-clamp-1">
              {name}
            </h3>
          </div>

          <div className="text-right absolute right-0">
            <p className="text-xs font-bold text-gray-900">{rp.convert(price)}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default Product