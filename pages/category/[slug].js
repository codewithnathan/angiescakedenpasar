import React, { useState, useEffect } from 'react'
import { client, urlFor } from '@/lib/client'
import { Product } from '../../components'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const Category = ({ products, categories }) => {
  const router = useRouter()
  const { slug } = router.query

  const [productsInfo, setProductsInfo] = useState(products)
  const [phrase, setPhrase] = useState('')

  let msg = false;
  let product;
  if (phrase) {
    product = productsInfo.filter(p => p.name.toLowerCase().includes(phrase))
    msg = false
    if (product.length < 1) {
      msg = true
    }
  } else {
    product = productsInfo
    msg = false
  }

  return (
    <>
      {!products.length ? (
        <div className='mx-auto text-center min-h-screen flex flex-col justify-center items-center'>
          <h2 className='text-4xl font-bold text-gray-900'>Oops..</h2>
          <p className='mt-4 text-base font-normal text-gray-600'><b className='font-mono text-black bg-gray-200 px-1 rounded'>{slug}</b> category<br /> is not available in our products</p>
        </div>
      ) : (
        <div className='py-20 px-3 min-h-screen'>
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900">{products[0].kategori.name}</h2>
              <p className="mt-4 text-base font-normal leading-7 text-gray-600">This page are show all the <b className='font-mono text-black bg-gray-200 px-1 rounded'>{products[0].kategori.name}</b> category</p>
              <div className='flex flex-col items-center justify-center gap-3 mt-3'>
                <div className='flex gap-2'>
                  {
                    categories?.map((item, i) => (
                      <a
                        href={`${item.slug.current}`}>
                        <div className={`border px-3 py-1 cursor-pointer ${products[0].kategori.name == item.name ? 'text-white bg-black border-none' : ''}`}>
                          {item.name}
                        </div>
                      </a>
                    ))
                  }
                </div>
                <input
                  className='border h-full px-4 py-3 w-3/4' placeholder='Search products...'
                  onChange={e => setPhrase(e.target.value)}
                />
              </div>
            </div>

            {msg && (
              <p className='mt-10 text-center'>Product not found</p>
            )}
            <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 md:grid-cols-3 lg:w-3/4 mx-auto">
              {product.map((product) => <Product key={product._id} product={product} />)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        kategori -> { slug } {
        slug {
        current
      }
    }
  }`

  const products = await client.fetch(query)
  const paths = products.map(product => ({
    params: {
      slug: product.kategori.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && kategori->{slug}.slug.current == '${slug}']{image, name, slug,info, kategori->{name, slug}, price, details}`

  const categoryQuery = '*[_type == "category"]'

  const categories = await client.fetch(categoryQuery)
  const products = await client.fetch(query)

  return {
    props: { products, categories }
  }
}

export default Category