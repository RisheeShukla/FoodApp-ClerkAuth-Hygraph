"use client"
import React  from "react";
import { useState,useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import GlobalApi from "@/app/_utils/GlobalApi";
import ReviewList from "./ReviewList";
function ReviewSection({restaurant}){
    const [rating,setRating]=useState(0)
    const [reviewText,setReviewText]=useState()
    const {user}=useUser()
    const[reviewL,setReviewList]=useState();
    useEffect(()=>{
     if(restaurant)
     {
        getReviewList();
     }
    },[restaurant])
    const handleSubmit=()=>{
   const data={
    email:user?.primaryEmailAddress?.emailAddress,
    profileImage:user?.imageUrl,
    userName:user?.fullName,
    star:rating,
    reviewText:reviewText,
    restaurantSlug:restaurant.slug

   }
   GlobalApi.AddNewReview(data).then(res=>{
    console.log(res)
    toast('Review Added!')
   },(error)=>{
    console.log(error)
   })
    }
    const getReviewList=()=>{
        GlobalApi.GetRestaurantReview(restaurant.slug).then(res=>{
            console.log(res)
            setReviewList(res?.reviews)
         
        })
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
            <div className="flex flex-col gap-2 p-5 border rounded-lg shadow-lg"> 
                <h2 className="font-bold text-lg"> Add your review</h2>
                <Rating className="text-yellow-300" style={{maxWidth:150}} value={rating} onChange={setRating}/>
              <Textarea  onChange={(e)=>setReviewText(e.target.value)}/>
              <Button disabled={rating==0 || !reviewText} onClick={()=>handleSubmit()} className="bg-red-500 w-full">Submit</Button>
            </div>
            <div className="col-span-2">
               <ReviewList reviewList={reviewL}/>
            </div>
        </div>
    )
}
export default ReviewSection