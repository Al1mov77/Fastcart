import { Link, Outlet } from 'react-router-dom'
import img1 from "../assets/Group 1116606595 (1).png"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import likered from "../assets/red.svg"
import likeblack from "../assets/black.svg"
import { useState } from 'react'

export default function Layout() {
  const [isLiked, setIsLiked] = useState(false)
  const [open, setOpen] = useState(false)

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div>
      <header>
        <nav className='flex justify-between items-center p-15'>
          
          <div className='flex items-center gap-4'>
            <button onClick={() => setOpen(!open)} className='sm:hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5"/>
              </svg>
            </button>

            <img src={img1} alt="" />
          </div>

          <div className='hidden sm:flex items-center gap-10'>
            <Link to="/"><p>Home</p></Link>
            <Link to="/contact"><p>Contact</p></Link>
            <Link to="/about"><p>About</p></Link>
            <Link to="/sign"><p>Sign Up</p></Link>
          </div>

          <div className='flex gap-5'>
            <div className='hidden sm:block'>
              <InputGroup className="max-w-xs">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">What are you looking for?</InputGroupAddon>
              </InputGroup>
            </div>

            <div className='flex items-center mt-1.5'>
              <Link to="wishlist">
                <button className='cursor-pointer' onClick={toggleLike}>
                  <img src={isLiked ? likered : likeblack} alt="" />
                </button>
              </Link>
            </div>

            <div className='flex items-center cursor-pointer'>
              <Link to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
              </Link>
            </div>

            <div className='flex items-center'>
              <Link to="/account">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
              </Link>
            </div>
          </div>
        </nav>

        {open && (
          <div className='sm:hidden flex flex-col gap-5 px-6 pb-5'>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/sign" onClick={() => setOpen(false)}>Sign Up</Link>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-black text-white p-30 mt-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 mb-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Exclusive</h3>
              <p className="text-sm text-gray-300">Subscribe</p>
              <p className="text-xs text-gray-400 mb-3">Get 10% off your first order</p>
              <InputGroup className="bg-transparent border-white/30">
                <InputGroupAddon className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                  </svg>
                </InputGroupAddon>
                <InputGroupInput 
                  placeholder="Enter your email" 
                  type="email"
                  className="bg-transparent text-white placeholder:text-gray-400 border-white/30 text-sm"
                />
                <InputGroupAddon className="cursor-pointer text-white hover:text-gray-300 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                  </svg>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
                <p>exclusive@gmail.com</p>
                <p>+88015-88888-9999</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account</h3>
              <nav className="space-y-2">
                <Link to="/account" className="text-sm text-gray-300 hover:text-white transition">My Account</Link>
                <Link to="/cart" className="block text-sm text-gray-300 hover:text-white transition">Cart</Link>
                <Link to="/wishlist" className="block text-sm text-gray-300 hover:text-white transition">Wishlist</Link>
                <Link to="/products" className="block text-sm text-gray-300 hover:text-white transition">Shop</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Link</h3>
              <nav className="space-y-2">
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition">Terms of Use</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white transition">FAQ</a>
                <Link to="/contact" className="block text-sm text-gray-300 hover:text-white transition">Contact</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.166 1.791.166v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.6 6.6 0 0 1-2.084.797 3.283 3.283 0 0 0-5.603 2.993 9.311 9.311 0 0 1-6.766-3.43 3.294 3.294 0 0 0-.443 1.651 3.28 3.28 0 0 0 1.46 2.732 3.278 3.278 0 0 1-1.488-.41v.041a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.491-.047 3.281 3.281 0 0 0 3.065 2.281 6.59 6.59 0 0 1-4.076 1.404A6.76 6.76 0 0 1 5.025 15"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.695 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">© Copyright Rimeu 2024. All right reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}