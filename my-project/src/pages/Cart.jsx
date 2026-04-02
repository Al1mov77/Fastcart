import { useEffect } from "react"
import { useTodo } from "./ProductsApi/Create"

function Cart() {
  const { getCart, cart } = useTodo()

  useEffect(() => {
    getCart()
  }, [])

  return (
    <div className="p-5">
      {cart && cart.length > 0 ? (
        cart.map((prod) => (
          <div key={prod.id} className="border p-2 mb-2 rounded">
            <p className="font-semibold">{prod.name}</p>
            <p>Price: {prod.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  )
}

export default Cart