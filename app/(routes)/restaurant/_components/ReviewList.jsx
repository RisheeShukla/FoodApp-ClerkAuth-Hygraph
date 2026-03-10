import React from "react";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";

 function ReviewList({reviewList})
 {
    return (
        <div className="flex flex-col gap-6">
      {reviewList && reviewList.map((item, index) => (
        <div 
          key={item.id || index} 
          className="flex gap-4 items-start p-5 border border-gray-100 rounded-2xl shadow-md hover:shadow-md hover:border-red-100 transition-all duration-300 bg-white group"
        >
        
          <div className="shrink-0">
            <Image 
              src={item?.profileImage } 
              alt={item.userName} 
              width={50} 
              height={50} 
              className="rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-gray-900 capitalize">{item.userName}</h2>
                
                <Rating 
                  style={{ maxWidth: 80 }} 
                  value={item.star} 
                   
                />
              </div>
              
              
              <span className="text-xs text-gray-400">
                {new Date(item.publishedAt).toLocaleDateString()}
              </span>
            </div>

            
            <p className="text-gray-600 text-xl leading-relaxed bg-gray-50 p-3 rounded-lg border border-transparent group-hover:border-gray-200 transition-colors">
              "{item.reviewText}"
            </p>
          </div>
        </div>
      ))}

      {reviewList?.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-2xl border-gray-100">
          <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}
    </div>
    )
 }
 export default ReviewList;