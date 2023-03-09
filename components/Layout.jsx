import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Angie's Cake Denpasar</title>
        <link rel='icon' href='./logo.png'></link>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='bg-gray-50'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div >
  )
}
