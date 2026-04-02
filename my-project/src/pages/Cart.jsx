import { useEffect } from "react"
import { useTodo } from "./ProductsApi/Create"
import { Button } from "@mui/material"

function Cart() {
  const { getCart, cart, increaseCart, reduceCart, deleteItem, clearCart } = useTodo()

  useEffect(() => {
    getCart()
  }, [])

  console.log("CART:", cart);

  return (
   <div className="p-8 bg-gray-100 overflow-auto">
  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="py-3 px-4 uppercase text-sm font-semibold">Product</th>
          <th className="py-3 px-4 uppercase text-sm font-semibold">Price</th>
          <th className="py-3 px-4 uppercase text-sm font-semibold">Quantity</th>
          <th>Increase/Reduce</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {Array.isArray(cart) && cart.map((prod) => (
          <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4">{prod.product.productName}</td>
            <td className="py-3 px-4">{prod.product.price}</td>
            <td className="py-3 px-4 text-center">{prod.quantity}</td>
            <td>
              <div className="flex gap-5 items-center">
                <Button variant="contained" onClick={() => increaseCart(prod)}>
                  +
                </Button>
                <Button onClick={() => reduceCart(prod)} color="error" variant="contained">
                  -
                </Button>
              </div>
            </td>
            <td>
                              <Button color="error" variant="contained" onClick={() => deleteItem(prod.id)}>
Delete

                </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="p-4 flex justify-end items-center gap-3">
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
        Checkout
      </button>
                      <Button color="error" variant="contained" onClick={() => clearCart()}>
                  Clear Cart
                </Button>
    </div>
  </div>
</div>
  )
}

export default Cart