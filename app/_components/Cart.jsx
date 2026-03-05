import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import GlobalApi from "../_utils/GlobalApi";
import { CartUpadteContext } from "../_context/CartUpdateContext";
import { toast } from "sonner";
function Cart({cart}){
    const {updateCart,setUpdateCart}=useContext(CartUpadteContext)
    const calculateCartAmount=()=>
    {
        let total=0;
        cart.forEach((item)=>
        {
            total=total+item.price;
        }
        )
        return total.toFixed(2);
    }
    useEffect(()=>{
 },[updateCart])
    const RemoveItemFromCart=(id)=>{
        GlobalApi.DisconnectRestroFromUserCartItem(id).then(res=>{
            if(res)
            {
                GlobalApi.DeleteCartFromItem(id).then(res=>{
                    toast('Item Deleted')
                    setUpdateCart(!updateCart)
                    
                },(error)=>{
                    console.log(error)
                })
            }
        },(error)=>{
            console.log(error)
        })
    }
    return(
        <div>
          <h2 className="text-2xl font-bold">{cart[0]?.restaurent?.name}</h2>
  <div>
    <h2 className="text-xl font-extrabold mb-4 tracking-tight">
      My Order
    </h2>
    {cart && cart.map((item, index) => (
      <div key={index} className="flex justify-between items-center gap-4 py-3 border-b border-gray-100 hover:bg-gray-50 px-2 rounded-lg transition-all">
        <div className="flex gap-3 items-center">
          <Image 
            src={item?.productImage} 
            alt={item.productName}
            width={48} 
            height={48} 
            className="h-12 w-12 rounded-xl object-cover shadow-sm border"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-sm leading-tight">{item?.productName}</h2>
            <h2 className="text-xs text-muted-foreground">{item?.restaurent?.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-sm">${item?.price}</h2>
          <X 
           onClick={()=>RemoveItemFromCart(item?.id)}
            fill="red" 
            className="text-red-500 h-4 w-4 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </div>
    ))}
    <Link href={'/checkout?restaurant='+cart[0]?.restaurent?.name}>
      <Button className="w-full mt-6 py-6 text-lg font-bold bg-red-500 hover:bg-red-600 transition-colors">
        Checkout : ${calculateCartAmount()}
      </Button>
    </Link>
  </div>
</div>
    )
 }
 export default Cart