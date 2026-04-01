import { useParams, useNavigate } from 'react-router-dom'
import { useTodo } from './ProductsApi/Create'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

function ProductInfo() {
  const { id } = useParams()
  const { infoData, product } = useTodo()
  const navigate = useNavigate()
  
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [wishlist, setWishlist] = useState({})

  useEffect(() => {
    infoData(id)
    const saved = localStorage.getItem("wishlike")
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
  }, [id, infoData])

  useEffect(() => {
    console.log("Product data:", product)
  }, [product])

  const toggleWishlist = () => {
    const updated = { ...wishlist, [id]: !wishlist[id] }
    setWishlist(updated)
    localStorage.setItem("wishlike", JSON.stringify(updated))
  }

  const handleBuyNow = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item.id === parseInt(id))
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: product.id,
        productName: product.productName,
        price: product.discountPrice,
        quantity: quantity,
        image: product.images?.[0]?.imageName || '',
        color: colors[selectedColor],
        size: selectedSize
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/checkout')
  }

  const increaseQuantity = () => setQuantity(q => q + 1)
  const decreaseQuantity = () => setQuantity(q => q > 1 ? q - 1 : 1)

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>
  }

  const colors = ['#fff', '#ff0000']
  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        <div className="md:col-span-1 flex flex-col gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-20 bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer">
              <img 
                src={`https://store-api.softclub.tj/images/${product?.images?.[i]?.imageName || ''}`}
                alt="product"
                onError={(e) => e.target.style.display = 'none'}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        <div className="md:col-span-2 flex items-center justify-center bg-gray-50 rounded-lg p-8 relative h-96">
          <img 
            src={`https://store-api.softclub.tj/images/${product?.images?.[0]?.imageName || ''}`}
            alt="product main"
            onError={(e) => e.target.style.display = 'none'}
            className="max-h-full max-w-full object-contain"
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md hover:bg-gray-100"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              fill={wishlist[id] ? '#ff0000' : 'none'} 
              stroke={wishlist[id] ? '#ff0000' : 'currentColor'}
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" fill={i < 4 ? '#FFB800' : '#E0E0E0'} viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">(88 Reviews)</span>
            <span className="text-sm text-red-500 font-semibold">In Stock</span>
          </div>

          <div className="text-4xl font-bold text-red-500 mb-4">${product.discountPrice}</div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <p className="font-semibold mb-3">Colours:</p>
            <div className="flex gap-3">
              {colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`w-6 h-6 rounded-full border-2 transition ${selectedColor === idx ? 'border-gray-800' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-3">Size:</p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border-2 rounded transition font-medium ${
                    selectedSize == size 
                      ? 'border-red-500 text-red-500' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-3 border-2 border-gray-300 rounded px-3 py-2">
              <button onClick={decreaseQuantity} className="text-gray-600 hover:text-gray-800 text-lg">−</button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button onClick={increaseQuantity} className="text-red-500 hover:text-red-600 text-lg">+</button>
            </div>
            <Button 
              onClick={handleBuyNow}
              variant="contained" 
              color="warning"
              style={{ flex: 1, padding: '10px' }}
            >
              Buy Now
            </Button>
          </div>

          <div className="space-y-3 border-t pt-6">
            <div className="flex items-start gap-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
              </svg>
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-gray-600">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
              </svg>
              <div>
                <p className="font-semibold">Return Delivery</p>
                <p className="text-sm text-gray-600">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo