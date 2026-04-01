import { useEffect, useState } from "react"


function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist"))
    setWishlist(saved)
  }, [])
  const removeItem = (id) => {
    const updated = wishlist.filter(item => item.id !== id)
    setWishlist(updated)
    localStorage.setItem("wishlist", JSON.stringify(updated))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 relative hover:shadow-lg transition"
            >
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full p-2 transition"
              >
                🗑
              </button>
              <img
               src={`https://store-api.softclub.tj/images/${item.image}`}
                alt={item.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h2 className="text-sm font-semibold">{item.name}</h2>
              <p className="text-red-500 font-bold mt-2">${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          Your wishlist is empty 
        </p>
      )}
    </div>
  )
}

export default Wishlist