import React, { useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { MapPin } from "lucide-react";
function Intro({restaurant})
{
    const [countt,setCount]=React.useState(0);
    const [total,setTotal]=React.useState(0);
    useEffect(()=>{
  let total=0;
  let count=0;
  restaurant?.review?.forEach(item=>{
    total=total+item.star;
    count++;
  })
  setCount(count);
  setTotal(total); 
  },[restaurant])
  
    return (
        <div> 
        <div>
           {restaurant?.banner?<Image src={restaurant?.banner?.url} alt={restaurant.name} width={100} height={300} className="w-full h-[220px] object-cover rounded-xl-corner">

            </Image>: <div> image not found </div> }
        </div>
        
        <h2 className="text-3xl font-bold mt-2">{restaurant.name} </h2>
         <div className="flex item-center gap-3">
            <Star fill="yellow" className="bg-red-500" width={20} height={20}> </Star>
            <label className="text-sm text-gray-500">{(total/countt).toFixed(1)}({countt})</label>
         </div>
         <h2 className="text-gray-500 mt-2 flex gap-2"> <MapPin/> {restaurant.address}</h2>
         </div>
    )
}
export default Intro;