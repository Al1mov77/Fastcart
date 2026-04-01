import { useState, useEffect } from "react"
import { useTodo } from "./ProductsApi/Create"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Button } from "@mui/material"

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} image
 */
export default function AllProducts() {
  const { data, getData } = useTodo()
  const [wishlist, setWishlist] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All products")
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [selectedRating, setSelectedRating] = useState(null)

  useEffect(() => {
    getData()
    const saved = localStorage.getItem("wishlist")
    if (saved) {
      setWishlist(JSON.parse(saved))
    }
  }, [])

  const toggleWishlist = (product) => {
    const saved = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    )

    const exists = saved.find(item => item.id === product.id)

    let updated

    if (exists) {
      updated = saved.filter(item => item.id !== product.id)
    } else {
      updated = [...saved, product]
    }

    localStorage.setItem("wishlist", JSON.stringify(updated))
    setWishlist(updated)
    toast.success("Wishlist updated!")
  }

  const addToCart = (product) => {
    const saved = JSON.parse(
      localStorage.getItem("cart") || "[]"
    )

    const exists = saved.find(item => item.id === product.id)

    let updated

    if (exists) {
      updated = saved.map(item =>
        item.id == product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
          
      )
      toast.error("Cart temporarily not working!")
    } else {
      updated = [...saved, { ...product, quantity: 1 }]
      toast.error("Cart temporarily not working!")
    }

    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const applyPriceFilter = () => {
    return true
  }

  const products = data?.slice(5) || []

  let filteredProducts = products

  if (selectedCategory !== "All products") {
    filteredProducts = filteredProducts.filter(p => p.categoryName === selectedCategory)
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      selectedBrands.includes(p.brandName?.name) || selectedBrands.includes(p.brand)
    )
  }

  if (priceMin || priceMax) {
    filteredProducts = filteredProducts.filter(p => {
      const price = p.discountPrice
      const min = priceMin ? parseInt(priceMin) : 0
      const max = priceMax ? parseInt(priceMax) : Infinity
      return price >= min && price <= max
    })
  }

  if (selectedRating) {
    filteredProducts = filteredProducts.filter(p => p.rating >= selectedRating)
  }

  const categories = ["All products", ...new Set(products.map(p => p.categoryName))]
  const brands = ["Samsung", "Apple", "Sony", "Nikon", "Lenov", "LG"]

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 min-h-screen bg-white">
      <aside className="w-full md:w-64">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg mb-4">Category</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === cat
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Price range</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                placeholder="$"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-1/2 px-2 py-1 border rounded text-sm"
              />
              <span>—</span>
              <input
                type="number"
                placeholder="$9999"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-1/2 px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    className="w-4 h-4"
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                  />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="12"
                        height="12"
                        fill={i < rating ? "#FFB800" : "#E0E0E0"}
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">& Up</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="group bg-white rounded-lg shadow-md p-3 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <Link to={`/product/${prod.id}`}>
                <div className="bg-gray-100 rounded-lg overflow-hidden relative h-48 flex items-center justify-center mb-4 cursor-pointer hover:shadow-lg transition">
                  {prod.hasDiscount && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                      NEW
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(prod)
                      }}
                      className="bg-white rounded-full p-2 hover:bg-gray-200 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill={wishlist.some(item => item.id === prod.id) ? "#ff0000" : "none"}
                        stroke={wishlist.some(item => item.id === prod.id) ? "#ff0000" : "currentColor"}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                    <button className="bg-white rounded-full p-2 hover:bg-gray-200 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    </button>
                  </div>

                  <img
                    src={`https://store-api.softclub.tj/images/${prod.image}`}
                    className="h-full w-full object-contain group-hover:scale-110 transition duration-300"
                  />
                </div>
              </Link>

              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2">
                  {prod.productName}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold text-base">
                    ${prod.discountPrice}
                  </span>
                  {prod.hasDiscount && (
                    <span className="text-gray-400 line-through text-xs">
                      ${prod.price}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill={i < 4 ? "#FFB800" : "#E0E0E0"}
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">(88)</span>
                </div>

                <div className="flex gap-1 pt-2">
                  {["#FF6B6B", "#4ECDC4", "#45B7D1"].map((color, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full border border-gray-300 cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => addToCart(prod)}
                  className="w-full mt-4 bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button style={{ padding: "10px 24px" }} color="warning" variant="contained">
            More Products
          </Button>
        </div>
      </main>
    </div>
  )
}
