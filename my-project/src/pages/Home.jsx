import { useEffect, useState } from "react"
import FancySpinner from "../swiper/FancySpinner"
import { useTodo } from "./ProductsApi/Create"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import img6 from "../assets/6.png"
import img7 from "../assets/7.png"
import img8 from "../assets/8.png"
import img9 from "../assets/9.png"
import img10 from "../assets/10.png"
function Home() {
    const {data, getData}= useTodo()
    const [wishlist, setWishlist] = useState({})

    useEffect(() =>{
        getData()
    },[])

    const toggleWishlist = (product) => {
    const saved = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    )

    const exists = saved.find(item => item.id == product.id)

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
  return (
    <>
    
       <section className="flex flex-col-reverse lg:flex-row lg:justify-between p-15">
<aside className="flex flex-col p-5">
<p>Woman’s Fashion</p> <br /> 
<p>Men’s Fashion</p> <br />
<p>Electronics</p> <br />
<p>Home & Lifestyle</p> <br />
<p>Medicine</p> <br />
<p>Sports & Outdoor</p> <br />
<p>Baby’s & Toys </p> <br />
<p>Groceries & Pets</p> <br />
<p>Health & Beauty</p>
</aside>
<aside>
<FancySpinner />
</aside>
   </section>

  
   <section className="flex justify-between items-center mt-10 px-4 md:px-6">
<div>
    <p className="font-bold text-lg md:text-2xl">Flash Sales</p>
</div>
   </section>

   <section className="mt-10 px-4 md:px-6 pb-10 overflow-x-auto scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
<div className="flex gap-6 pb-4">
    {data?.slice(0, 5).map((prod) => (
        <div key={prod.id} className="group bg-white rounded-lg shadow-md p-3 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <Link to={`/product/${prod.id}`}>
                <div className="bg-gray-100 rounded-lg overflow-hidden relative h-56 md:h-64 flex items-center justify-center mb-4 cursor-pointer hover:shadow-lg transition">
                    {prod.hasDiscount && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold z-10">
                            -{Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)}%
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
                                width="18" 
                                height="18" 
                                fill={wishlist[prod.id] ? '#ff0000' : 'none'} 
                                stroke={wishlist[prod.id] ? '#ff0000' : 'currentColor'}
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                        <button className="bg-white rounded-full p-2 hover:bg-gray-200 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
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
                <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">
                    {prod.productName}
                </h3>

                <div className="flex items-center gap-3">
                    <span className="text-red-500 font-bold text-lg">
                        ${prod.discountPrice}
                    </span>
                    {prod.hasDiscount && (
                        <span className="text-gray-400 line-through text-sm">
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
                                width="14" 
                                height="14" 
                                fill={i < 4 ? '#FFB800' : '#E0E0E0'}
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">(88)</span>
                </div>

                <p className="text-xs text-gray-500">{prod.categoryName}</p>
            </div>
        </div>
    ))}
</div>
   </section>
     <section className="flex justify-center items-center p-20">

 <Button style={{padding:"10px"}} color="warning" variant="contained">
    <Link to='/all-products'>
        View All Products
    </Link>

    
    </Button>
   </section>

   

   <section className="mt-12 px-4 md:px-6">
     <div className="mb-6">
       <p className="text-red-500 font-bold text-sm mb-2">Categories</p>
       <div className="flex justify-between items-center">
         <h2 className="text-2xl md:text-3xl font-bold">Browse By Category</h2>
         <div className="flex gap-2">
           <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
               <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
             </svg>
           </button>
           <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
               <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
             </svg>
           </button>
         </div>
       </div>
     </div>
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pb-10">
       <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:bg-gray-50 transition h-32">
         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
           <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
           <path d="M12 18h.01"></path>
         </svg>
         <p className="text-center text-xs font-medium">Phones</p>
       </div>
       <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:bg-gray-50 transition h-32">
         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
           <path d="M20 3H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14l4 4v-4h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
         </svg>
         <p className="text-center text-xs font-medium">Computers</p>
       </div>
       <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:bg-gray-50 transition h-32">
         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
           <circle cx="12" cy="12" r="7"></circle>
           <path d="M12 5V3M12 21v-2M8 8l-1.4-1.4M17.4 17.4l-1.4-1.4M5 12H3M21 12h-2"></path>
         </svg>
         <p className="text-center text-xs font-medium">SmartWatch</p>
       </div>
       <div className="border-0 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-red-500 text-white shadow-lg hover:shadow-xl transition h-32">
         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
           <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
           <circle cx="12" cy="13" r="4"></circle>
         </svg>
         <p className="text-center text-xs font-medium">Camera</p>
       </div>
       <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:bg-gray-50 transition h-32">
         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
           <path d="M3 9l4-7h10l4 7M7 9v8c0 2.2 1.8 4 4 4h2c2.2 0 4-1.8 4-4V9"></path>
         </svg>
         <p className="text-center text-xs font-medium">HeadPhones</p>
       </div>
       <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:bg-gray-50 transition h-32">
         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mb-2">
           <path d="M6 2h12c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4H6c-2.2 0-4-1.8-4-4V6c0-2.2 1.8-4 4-4zm2 10h8v-2H8v2zm0 2v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/>
         </svg>
         <p className="text-center text-xs font-medium">Gaming</p>
       </div>
     </div>
   </section>
   <section className="bg-black text-white p-20 mt-10">
     <div className="flex flex-col md:flex-row items-center justify-between gap-8">
       <div className="flex-1">
         <p className="text-green-500 text-sm font-semibold mb-2">Categories</p>
         <h2 className="text-4xl md:text-5xl font-bold mb-8">Enhance Your Music Experience</h2>
         
         <div className="flex gap-4 mb-8">
           <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
             <span className="text-lg font-bold">23</span>
             <span className="text-xs">Hours</span>
           </div>
           <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
             <span className="text-lg font-bold">05</span>
             <span className="text-xs">Days</span>
           </div>
           <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
             <span className="text-lg font-bold">59</span>
             <span className="text-xs">Minutes</span>
           </div>
           <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
             <span className="text-lg font-bold">35</span>
             <span className="text-xs">Seconds</span>
           </div>
         </div>
         
         <button className="bg-green-500 text-black px-8 py-3 rounded font-semibold hover:bg-green-600 transition">
           Buy Now
         </button>
       </div>
       
       <div className="flex-1 flex justify-center">
         <img src={img6} alt="Speaker" className="w-full max-w-sm" />
       </div>
     </div>
   </section>
   <div>
   </div>

   <section className="px-4 md:px-6 py-12">
     <div className="mb-8">
       <p className="text-red-500 font-bold text-sm mb-2">Our Products</p>
       <h2 className="text-3xl md:text-4xl font-bold">Explore Our Products</h2>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
       {data?.slice(5).map((prod) => (
         <div key={prod.id} className="group bg-white rounded-lg shadow-md p-3 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
           <Link to={`/product/${prod.id}`}>
             <div className="bg-gray-100 rounded-lg overflow-hidden relative h-48 flex items-center justify-center mb-4 cursor-pointer hover:shadow-lg transition">
               {prod.hasDiscount && (
                 <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold z-10">
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
                     width="18" 
                     height="18" 
                     fill={wishlist[prod.id] ? '#ff0000' : 'none'} 
                     stroke={wishlist[prod.id] ? '#ff0000' : 'currentColor'}
                     strokeWidth="2"
                     viewBox="0 0 24 24"
                   >
                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                   </svg>
                 </button>
                 <button className="bg-white rounded-full p-2 hover:bg-gray-200 transition">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                     <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                     <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
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
             <div className="flex justify-between items-start mb-2">
               <h3 className="text-sm md:text-base font-medium text-gray-900 flex-1">
                 {prod.productName}
               </h3>
             </div>

             <div className="flex items-center gap-3">
               <span className="text-red-500 font-bold text-lg">
                 ${prod.discountPrice}
               </span>
               {prod.hasDiscount && (
                 <span className="text-gray-400 line-through text-sm">
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
                     fill={i < 4 ? '#FFB800' : '#E0E0E0'}
                     viewBox="0 0 16 16"
                   >
                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                   </svg>
                 ))}
               </div>
               <span className="text-xs text-gray-500">(88)</span>
             </div>

             <div className="flex gap-2 pt-2">
               {[...(prod.colors || [])].map((color, idx) => (
                 <div
                   key={idx}
                   className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer"
                   style={{ backgroundColor: color }}
                 />
               ))}
             </div>
           </div>
         </div>
       ))}
     </div>

     <div className="flex justify-center mt-10">
       <Button style={{padding:"10px 20px"}} color="warning" variant="contained">
         <Link to='/all-products' style={{ textDecoration: 'none', color: 'inherit' }}>
           View All Products
         </Link>
       </Button>
     </div>
   </section>

   <section className="px-4 md:px-6 py-12">
     <div className="mb-8">
       <h2 className="text-3xl md:text-4xl font-bold">New Arrival</h2>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <div className="bg-black text-white rounded-lg overflow-hidden col-span-1 md:col-span-1">
         <div className="h-80 overflow-hidden">
           <img src={img7} alt="PlayStation 5" className="w-full h-full object-cover" />
         </div>
         <div className="p-6">
           <h3 className="text-2xl font-bold mb-2">PlayStation 5</h3>
           <p className="text-sm text-gray-300 mb-4">Black and White variants of the PS5 coming out on sale.</p>
           <button className="text-white underline hover:no-underline">Shop Now</button>
         </div>
       </div>

       <div className="grid grid-cols-1 grid-rows-3 gap-6 col-span-1 md:col-span-1 lg:col-span-3">
         <div className="bg-black text-white rounded-lg overflow-hidden md:col-span-2 row-span-2">
           <div className="h-full flex">
             <div className="flex-1 p-8 flex flex-col justify-center">
               <h3 className="text-2xl font-bold mb-2">Women's Collections</h3>
               <p className="text-sm text-gray-300 mb-4">Featured woman collections that give you another vibe.</p>
               <button className="text-white underline hover:no-underline w-fit">Shop Now</button>
             </div>
             <div className="flex-1 h-64 overflow-hidden">
               <img src={img8} alt="Women's Collections" className="w-full h-full object-cover" />
             </div>
           </div>
         </div>

         <div className="bg-black text-white rounded-lg overflow-hidden p-4 flex flex-col justify-between relative h-40" style={{ backgroundImage: `url(${img9})`, backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat', backgroundSize: '40%' }}>
           <div>
             <h3 className="text-lg font-bold mb-1">Speakers</h3>
             <p className="text-xs text-gray-300 mb-2">Amazon wireless speaker</p>
             <button className="text-white underline hover:no-underline w-fit text-xs">Shop Now</button>
           </div>
         </div>

         <div className="bg-black text-white rounded-lg overflow-hidden p-4 flex flex-col justify-between relative h-40" style={{ backgroundImage: `url(${img10})`, backgroundPosition: 'bottom right', backgroundRepeat: 'no-repeat', backgroundSize: '40%' }}>
           <div>
             <h3 className="text-lg font-bold mb-1">Perfume</h3>
             <p className="text-xs text-gray-300 mb-2">GUCCI INTENSE OUD EDP</p>
             <button className="text-white underline hover:no-underline w-fit text-xs">Shop Now</button>
           </div>
         </div>
       </div>
     </div>
   </section>

   <section className="px-4 md:px-6 py-16">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="flex flex-col items-center text-center">
         <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
             <path d="M8 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 8 1zm0-1C3.58 0 0 1.462 0 3.25v9.5C0 14.538 3.58 16 8 16s8-1.462 8-3.25v-9.5C16 1.462 12.42 0 8 0z"/>
           </svg>
         </div>
         <h3 className="text-lg font-bold mb-2">FREE AND FAST DELIVERY</h3>
         <p className="text-gray-600 text-sm">Free delivery for all orders over $340</p>
       </div>

       <div className="flex flex-col items-center text-center">
         <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
             <path d="M8 4a.5.5 0 0 0-1 0v5.95a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 10.71V4z"/>
           </svg>
         </div>
         <h3 className="text-lg font-bold mb-2">24/7 CUSTOMER SERVICE</h3>
         <p className="text-gray-600 text-sm">Friendly 24/7 customer support</p>
       </div>

       <div className="flex flex-col items-center text-center">
         <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm3.5-9.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zm-5 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zm3.5 3.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
           </svg>
         </div>
         <h3 className="text-lg font-bold mb-2">MONEY BACK GUARANTEE</h3>
         <p className="text-gray-600 text-sm">We return money within 30 days</p>
       </div>
     </div>
   </section>

    </>
  )
}
export default Home