import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
// @ts-ignore

import Layout from '@/pages/Layout'
// @ts-ignore
import Home from '@/pages/Home'
// @ts-ignore
import Products from '@/pages/Products'
// @ts-ignore
import AllProducts from '@/pages/AllProducts'
// @ts-ignore
import ProductInfo from '@/pages/ProductInfo'
// @ts-ignore
import Cart from '@/pages/Cart'
// @ts-ignore
import Checkout from '@/pages/Checkout'
// @ts-ignore
import Wishlist from '@/pages/Wishlist'
// @ts-ignore
import About from '@/pages/About'
// @ts-ignore
import Contact from '@/pages/Contact'
// @ts-ignore
import Account from '@/pages/Account'

// @ts-ignore
import Login from '@/pages/Login'
// @ts-ignore
import Sign from '@/pages/Sign'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App