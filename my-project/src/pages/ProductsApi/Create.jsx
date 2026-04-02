import {create} from "zustand"
import { API, getToken } from "../../../url/url";
import axios from "axios";

export const useTodo = create((set,get) =>({
    data:[],
    product:null,
    cart:[],
    getData: async () =>{
       try {
        const {data} = await axios.get(`${API}/Product/get-products`)
        set({data:data.data.products})
        console.log(data);
       } catch (error) {
        console.error(error);
       }
    },

    infoData: async (id) =>{
       try {
        const {data} = await axios.get(`${API}/Product/get-product-by-id?id=${id}`)
         set({ cart: data.data[0]?.productsInCart || [] });
        console.log(data);
        
       } catch (error) {
        console.error(error);
       }
    },
   
  addCartt: async (prod) => {
  try {
    const token = getToken();

    await axios.post(
      `https://store-api.softclub.tj/Cart/add-product-to-cart?id=${prod.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    get().getCart();
  } catch (error) {
    console.error(error);
  }
},

  getCart: async () => {
  try {
    const token = getToken()
   const { data } = await axios.get(
  `https://store-api.softclub.tj/Cart/get-products-from-cart`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
set({ cart: data.data[0].productsInCart })
console.log(data);

  } catch (error) {
    console.error(error)
  }
},
reduceCart: async (prod) => {
  try {
    const token = getToken();

    await axios.put(
      `https://store-api.softclub.tj/Cart/reduce-product-in-cart?id=${prod.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    get().getCart();
  } catch (error) {
    console.error(error);
  }
},
increaseCart: async (prod) => {
  try {
    const token = getToken();

    await axios.put(
      `https://store-api.softclub.tj/Cart/increase-product-in-cart?id=${prod.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    get().getCart();
  } catch (error) {
    console.error(error);
  }
},
deleteItem: async (id) => {
  try {
    const token = getToken();

    await axios.delete(
      `https://store-api.softclub.tj/Cart/delete-product-from-cart?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    get().getCart();
  } catch (error) {
    console.error(error);
  }
},
clearCart: async () => {
  try {
    const token = getToken();

    await axios.delete(
      `https://store-api.softclub.tj/Cart/clear-cart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    get().getCart();
  } catch (error) {
    console.error(error);
  }
}
}))