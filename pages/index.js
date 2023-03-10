import React, { useEffect, useState } from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const Home = ({ products, bannerData, categories }) => {
  const [productsInfo, setProductsInfo] = useState(products)
  const [phrase, setPhrase] = useState('')
  const [category, setCategory] = useState('')

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
    <div>
      <HeroBanner banner={bannerData.length && bannerData[0]} />

      <section className="px-2 py-12 bg-white sm:py-16 lg:py-20 min-h-screen">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900">Our Products</h2>
            <p className="mt-4 text-base font-normal leading-7 text-gray-600">Here are our products.</p>
            <div className='flex flex-col items-center justify-center gap-3 mt-3'>
              <div className='flex gap-2'>
                {
                  categories?.map((item, i) => (
                    <Link
                      href={`category/${item.slug.current}`}>
                      <div className='border px-3 py-1 cursor-pointer'>
                        {item.name}
                      </div>
                    </Link>
                  ))
                }
              </div>
              <input
                className='border h-full px-4 py-3 w-full sm:w-3/4' placeholder='Search products...'
                onChange={e => setPhrase(e.target.value)}
              />
            </div>
          </div>

          {msg && (
            <p className='mt-10 text-center'>Product not found</p>
          )}
          <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 md:grid-cols-3 lg:w-3/4 mx-auto">
            {product?.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </div>
      </section >
    </div >
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]{image, name, slug,info, kategori->{name, slug}, price, details}';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]{image, name, slug, info, kategori->{name, slug}, price, details}';
  const bannerData = await client.fetch(bannerQuery);

  const categoryQuery = '*[_type == "category"]'
  const categories = await client.fetch(categoryQuery)

  return {
    props: { products, bannerData, categories }
  }
}

export default Home;