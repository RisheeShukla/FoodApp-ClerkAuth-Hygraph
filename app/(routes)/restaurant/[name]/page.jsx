"use client"
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import Intro from "../_components/Intro";
import Tabs from "../_components/Tabs";
 function RestaurantDetails()
 {

    const params=usePathname()
    const [restaurant,setRestaurant]=useState([])
    useEffect(()=>{
       GetRestaurentDetail(params.split("/")[2])
    },[params])
    const GetRestaurentDetail=(restroSlug)=>{
          GlobalApi.GetBusinessDetail(restroSlug).then(res=>{
           setRestaurant(res.restaurent)
          })
    }
    return ( 
        <div>
        <Intro restaurant={restaurant}></Intro>
        <Tabs restaurant={restaurant}></Tabs>
         </div>

    )
 }
 export default RestaurantDetails;