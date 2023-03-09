import React, { useState } from 'react'

import { client, urlFor } from '@/lib/client'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import { Product } from '@/components'
import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
const rp = require('rupiah-format')

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product

  const [index, setIndex] = useState(0)
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }

  return (
    <div className='py-24 px-6'>
      <div className='md:flex md:justify-center sm:flex-none gap-10 '>
        <div>
          <div>
            <img src={urlFor(image && image[index])} className='bg-gray-200 w-96 h-96 rounded-xl object-cover' />
          </div>
          <div className='flex gap-3 my-5 overflow-x-auto scrollbar-hide'>
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={i == index ? 'rounded-lg bg-gray-100 w-16 h-16 cursor-pointer bg-gray-300' : ' rounded-lg bg-gray-100 w-16 h-16 cursor-pointer'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className='space-y-5'>
          <h1 className='font-bold text-4xl'>{name}</h1>
          <Link href={`/category/${product?.kategori?.slug?.current}`}>
            <div className='bg-black w-fit text-white px-2 py-0.5 text-xs cursor-pointer'>
              {product.kategori.name}
            </div>
          </Link>
          <h4 className='font-semibold'>Details: </h4>
          <p className='text-gray-600 md:w-96'>{details}</p>
          <p className='font-bold text-3xl md:text-4xl'>{rp.convert(price)}</p>
          <div className='flex gap-5 items-center'>
            <h3>Quantity: </h3>
            <p className='border border-black flex items-center'>
              <span className='border-r border-black p-3 cursor-pointer' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='text-lg px-4'>{qty}</span>
              <span className='border-l border-black p-3 cursor-pointer' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='flex flex-col xs:flex-row gap-5'>
            <button
              type='button'
              className='px-10 py-3 bg-black text-white'
              onClick={() => onAdd(product, qty)}
            >Add to Cart</button>
            <button
              type='button'
              className='px-10 py-3 border-2 border-black'
              onClick={handleBuyNow}
            >Buy Now</button>
          </div>
        </div>
      </div>
      <div className='mt-20 text-center'>
        <h2 className='text-4xl font-bold'>You may also like</h2>
        <div className='grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 md:grid-cols-3 lg:w-3/4 mx-auto'>
          {products.map(item => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query)
  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}']{image, name, slug,info, kategori->{name, slug}, price, details, _id}[0]`
  const productsQuery = '*[_type == "product"]{image, name, slug,info, kategori->{name, slug}, price, details}'

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product }
  }
}

export default ProductDetails