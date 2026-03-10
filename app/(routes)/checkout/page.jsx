"use client"
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import React from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { CartUpadteContext } from "@/app/_context/CartUpdateContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Checkout(){
    const params=useSearchParams();
    const [cart,setCart]=React.useState([]);
    const [total,setTotal]=React.useState(0);
   const {updateCart,setUpdateCart}=useContext(CartUpadteContext)
    const {user}=useUser();
    const [email,setEmail]=useState();
    const [name,setName]=useState();
    const [phone,setPhone]=useState();
    const [address,setAddress]=useState();
    const [zip,setZip]=useState();
    
    useEffect(()=>{
        console.log(params.get('restaurant'))
        user&&GetUserCart();
    },[user || updateCart])
    const GetUserCart=()=>{
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(res=>{
            console.log(res)
            setCart(res?.userCarts)
        },(error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        let totalAmount=0;
        cart.forEach(item=>{
            totalAmount=totalAmount+item.price;
        })
        setTotal(totalAmount);
    },[cart])
    const addToOrder=()=>{
        const data={
            emial:user?.primaryEmailAddress?.emailAddress,
            restaurantName:params.get('restaurant'),
            userName:user?.fullName,
            phone:phone,
            address:address,
            zipCode:zip,
            orderAmount:(total * 1.18).toFixed(2)
        }
        GlobalApi.CreateNewOrder(data).then(res=>{
            toast('Order Placed Successfully!')
            if(res?.createOrder?.id)
            {
                cart.forEach(item=>{
                    GlobalApi.UpdateOrderToAddOrderItems(item.productName,item.price,res?.createOrder?.id).then(result=>{
                        toast('Order Updated with items')
                    })
                })
                GlobalApi.DeleteCart(user?.primaryEmailAddress?.emailAddress).then(res=>{
                    setUpdateCart(!updateCart)
                })
            }
        },(error)=>{
            console.log(error)
        })
    }
    
    return (
        <div>
           <h2 className="font-bold text-4xl border border-yellow-500 rounded-lg shadow-md shadow-orange-400 text-center my-5">CHECKOUT </h2>
       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Details</h2>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <Input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <Input type="tel" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <Input type="text" placeholder="Zip" value={zip} onChange={(e)=>setZip(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address</label>
            <Textarea rows="3" placeholder="Address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border" value={address} onChange={(e)=>setAddress(e.target.value)} />
          </div>
        </form>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Cart Items : {cart?.length || 0}</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${total}</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Delivery Time </span>
              <span className="font-medium text-orange-600">20-30 Minutes</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Estimated Tax(18%) </span>
              <span className="font-medium text-gray-900">${(total * 0.18).toFixed(2)}</span>
            </div>

            

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-extrabold text-red-600">${(total + total * 0.18).toFixed(2)}</span>
            </div>

            <Button onClick={()=>addToOrder()} className="w-full mt-6 bg-orange-400 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition duration-200">
              Complete Payment
            </Button>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>    
        </div>
    )       
}
export default Checkout;