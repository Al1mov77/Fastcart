import { useEffect, useState } from "react"
import {Button} from "@mui/material"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const navigate = useNavigate()
  const notify = () => toast("Success!");
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
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">Wishlist</h1>

      {wishlist.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center w-40 mx-auto">
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
              <h2 className="text-sm font-semibold">{item.productName}</h2>
              <p className="text-red-500 font-bold mt-2">${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          Your wishlist is empty 
        </p>
      )}
      <div className="flex mt-10 items-center justify-center">
      <Button onClick={() =>{
        toast.success('Success! Back Home Page...')
        localStorage.removeItem("wishlist")
        setTimeout(() => {
navigate("/")
        }, 1500);
      }} color="warning" variant="contained">Clear wishlist</Button>
      </div>
      
    </div>
  )
}

export default Wishlist