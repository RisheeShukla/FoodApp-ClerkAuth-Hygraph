"use client"
import React, { useState } from 'react';
import Header from './_components/Header';
import { Toaster } from 'sonner';
import { CartUpadteContext } from './_context/CartUpdateContext';
function Provider({children}) {
  const [updateCart,setUpdateCart]=useState(false);
  return (
    <CartUpadteContext.Provider value={{updateCart,setUpdateCart}}>
   <div className='px-10 md:px-20 relative mb-20'>
    <Header />
    <Toaster/>
     {children}
     </div> 
    </CartUpadteContext.Provider>  
    )
}
export default Provider;