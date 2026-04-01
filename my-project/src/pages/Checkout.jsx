import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [couponCode, setCouponCode] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(cartData)
    const sum = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    setTotal(sum)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    if (!form.firstName || !form.lastName || !form.streetAddress || !form.townCity || !form.phoneNumber || !form.emailAddress) {
      alert('Please fill in all required fields')
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      localStorage.removeItem('cart')
      setShowAnimation(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {showAnimation && (
        <div className="fixed inset-0 bg-red-500 animate-pulse z-50 flex items-center justify-center">
          <div className="text-white text-4xl font-bold animate-bounce">✓ Order Placed!</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          <h2 className="text-2xl font-bold mb-8">Billing Details</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:bg-white"
            />
            
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:bg-white"
            />
            
            <input
              type="text"
              name="streetAddress"
              placeholder="Street address"
              value={form.streetAddress}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:bg-white"
            />
            
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, floor, etc. (optional)"
              value={form.apartment}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:bg-white"
            />
            
            <input
              type="text"
              name="townCity"
              placeholder="Town/City"
              value={form.townCity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:bg-white"
            />
            
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              value={form.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:bg-white"
            />
            
            <input
              type="email"
              name="emailAddress"
              placeholder="Email address"
              value={form.emailAddress}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:bg-white"
            />

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="saveInfo"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
              <label htmlFor="saveInfo" className="cursor-pointer text-gray-700">
                Save this information for faster check-out next time
              </label>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

          <div className="bg-white rounded-lg p-6 space-y-6">
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://store-api.softclub.tj/images/${item.image}`}
                          alt={item.productName}
                          className="w-full h-full object-contain"
                          onError={(e) => e.target.src = ''}
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{item.productName}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No items in cart</p>
              )}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <p className="font-semibold mb-2">Payment Method</p>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span>Bank</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span>Cash on delivery</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none"
              />
              <button className="px-6 py-2 border border-red-500 text-red-500 font-semibold rounded hover:bg-red-50">
                Apply
              </button>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || cart.length === 0}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-600 disabled:bg-gray-400 transition"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout