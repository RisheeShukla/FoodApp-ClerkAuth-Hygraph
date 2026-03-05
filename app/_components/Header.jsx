"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Search, ShoppingBasketIcon } from 'lucide-react';
import { LucideShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser,SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { CartUpadteContext } from '../_context/CartUpdateContext';
import Cart from './Cart';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import GlobalApi from '../_utils/GlobalApi';
function Header() {
    const {user, isSignedIn} = useUser();
    const {updateCart,setUpdateCart}=useContext(CartUpadteContext)
    const [cart,SetCart]=useState([])
    useEffect(()=>{
      user&&GetUserCart()
    },[updateCart||user])
    const GetUserCart=()=>
    {
        GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(res=>{
           SetCart(res.userCarts)
        },(error)=>{
            console.log(error)
        })
    }
  return (
   <div className='flex justify-between items-center p-8 md:px-25 shadow-sm left-0 right-0'>
    <Image src="/logo.png" alt="Foodie Logo" width={100} height={120} />
    <div className="hidden md:flex border p-2 rounded-lg bg-gray-100 w-full max-w-md mx-auto mt-4 relative">
        <input className='w-full p-2 bg-transparent border border-gray-300 rounded-md pl-10' type="text" placeholder="Search for food items..."></input>
        <Search className="absolute right-6 top-4.5 text-red-500" size={20} />
    </div>
   {isSignedIn ? 
   <div className='flex gap-6 item-center'>
    
    <Popover>
  <PopoverTrigger asChild>
    <div className='flex gap-3 item-center'>
        <LucideShoppingCart/>
        <label className='p-2 rounded-lg bg-slate-200'>{cart?.length} </label>
    </div>
  </PopoverTrigger>
  <PopoverContent>
    <Cart cart={cart}/>
  </PopoverContent>
</Popover>
   <UserButton className="w-20 h-20 ml-4"></UserButton>
   </div>
    : <div className="flex justify-end max-w-2xl mx-auto mt-4">
        <SignInButton mode='modal'>
<Button className="bg-orange-600 hover:bg-orange-700 text-white ml-2">Login</Button>
    </SignInButton>
    <SignUpButton mode='modal'>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white ml-2">Sign Up</Button>
    </SignUpButton>
    </div>}
   </div>   
    )
}
export default Header;