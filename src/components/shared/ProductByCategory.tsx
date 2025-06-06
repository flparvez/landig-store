"use client"
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/UseOrders'
import { IProduct } from '@/types/product'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductLoadingSkeleton from '../ProductLoadingSkeleton'

const ProductByCategory = ({slug}:{slug:string}) => {
    const {products,isLoading} = useProducts()
  const { addToCart } = useCart();


// Step 1: Filter products by category slug
const productsBySlug = products?.products?.filter(
  (product) => product?.category?.slug === slug
) ?? [];


// Step 2: Sort by popularityScore (descending)
const productsByCategory = [...productsBySlug].sort(
  (a, b) => (b?.popularityScore || 0) - (a?.popularityScore || 0)
);

if (isLoading) {
  <ProductLoadingSkeleton />
}
    return (
      
  <div className=" mt-8 mx-auto sm:px-4 sm:py-4">

  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 m-1">
    {productsByCategory?.map((product:IProduct) => (
         <div key={product._id} 
         className="bg-white rounded-lg   hover:shadow-md transition-shadow duration-200 overflow-hidden "
  
       >
       <Link href={`/product/${product.slug}`} prefetch={true}>
           <div className="relative aspect-square">
             <Image
                 src={product.images[0].url || "/placeholder-product.jpg"}
               alt={product.name}
               fill
               className="object-cover"
               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
             />
         {
           product?.discount ?  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
           {product?.discount}% OFF
         </span> : null
         }
           </div>
         
           </Link>
         <div className="p-2">
         <Link href={`/product/${product.slug}`} prefetch={true}>
             <h3 className=" sm:text-lg text-sm font-bold mb-1 line-clamp-2 hover:text-blue-600 transition">
               {product.shortName}
             </h3>
       
   </Link>
          
   
           <div className="flex items-center justify-between">
             <div>
               <p className="text-lg font-bold text-gray-800">
               ৳{product.price}
               </p>
               {product.originalPrice && product.originalPrice > product.price && (
                 <p className="text-sm text-gray-500 line-through">
                   ৳{product.originalPrice}
                 </p>
               )}
             </div>
         

             {/* add to cart */}
             <div className={`flex space-x-2 transition-opacity  hover:opacity-100 opacity-0}`}>
               <button   onClick={() => addToCart(product)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                 <ShoppingCart size={18} />
               </button>
            
            
           </div>



         </div>
         </div>
        
       </div>
    
    ))}
  </div>
</div>

    )
}

export default ProductByCategory
