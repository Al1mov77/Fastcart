import {create} from "zustand"
import { API } from "../../../url/url";
import axios from "axios";

export const useTodo = create((set,get) =>({
    data:[],
    product:null,
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
        set({product:data.data})
        console.log(data);
        
       } catch (error) {
        console.error(error);
       }
    }
}))