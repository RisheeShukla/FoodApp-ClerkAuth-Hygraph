"use client"
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { PlusSquare } from "lucide-react";
import Image from "next/image"; 
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import { CartUpadteContext } from "@/app/_context/CartUpdateContext";

function MenuSection({ restaurant }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
  const {user}=useUser();
  const {updateCart,setUpdateCart}=useContext(CartUpadteContext)
    useEffect(() => {
        if (restaurant?.menu?.length > 0) {
           
            FilterMenu(restaurant.menu[0].category);// it shows first category as the default one..
        }
    }, [restaurant]);

    const FilterMenu = (categoryName) => {
        const result = restaurant?.menu?.filter((item) => item.category === categoryName);
        setSelectedCategory(result[0]);
    };
    const addToCartHandler=(item)=>{
        toast('Adding to cart')
              const data={
                email:user?.primaryEmailAddress?.emailAddress,
                name:item?.name,
                description:item?.description,
                productImage:item?.productImage?.url,
                price:item?.price,
                restaurantSlug:restaurant?.slug
              }
        GlobalApi.AddToCart(data).then(res=>{
            setUpdateCart(!updateCart)
           toast('Added to cart')
     },(error)=>{
        toast('Error while adding to cart',error)
     })

    }

    return (
        <div>
            <div className="grid grid-cols-4 mt-2">
               
                <div className="hidden md:flex flex-col">
                    {restaurant?.menu?.map((item, index) => (
                        <Button 
                            key={index} 
                            onClick={() => FilterMenu(item.category)} 
                            variant="ghost" 
                            className="flex justify-start"
                        >
                            {item.category}
                        </Button>
                    ))}
                </div>

               
                <div className="col-span-3">
                    <h2 className="font-extrabold text-lg">{selectedCategory?.category}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {selectedCategory?.menuItem?.map((item, index) => (
                            <div key={index} className="flex flex-cols p-2 border rounded-xl flex gap-3">
                              
                                <Image 
                                    src={item?.productImage?.url || "/placeholder.jpg"} 
                                    alt={item.name} 
                                    width={120} 
                                    height={120} 
                                    className="object-cover w-[120px] h-[120px] rounded-lg"
                                />
                                 <div>
                                    <h2 className="font-bold mt-3">{item.name}</h2>
                                    <h2 className="text-primary font-bold">Price : ${item.price}</h2>
                                    <h2 className="text-sm text-gray-500">{item.description}</h2>
                                    <PlusSquare  onClick={()=>addToCartHandler(item)} className="mt-2 cursor-pointer"/>
                                </div>
                            </div>
                            
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuSection;