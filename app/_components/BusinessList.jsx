"use client"
import React, { useEffect } from "react"
import { Star } from 'lucide-react';
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Clock, Info, ArrowRight } from 'lucide-react';
import Link from "next/link";
import GlobalApi from "../_utils/GlobalApi";
function BusinessList() {
    const params=useSearchParams();
const [category,setCategory]=React.useState('all');
const [businesses,setBusinesses]=React.useState([]);
const calculateRating=(business)=>{
  let total=0;
  let count=0;
  business?.review?.forEach(item=>{
    total=total+item.star;
    count++;
  })
  return count > 0 ? total / count : 0;
}
  useEffect(() => {
      params&&setCategory(params.get('category'));
      params&&getBusinessList(params.get('category'));
  }, [params])
  const getBusinessList=(category_)=>{
     GlobalApi.GetBusinesses(category_).then((res)=>{
      setBusinesses(res.restaurents);
     })
  }
    return (
        <div className="mt-8 px-4 md:px-8">
     
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
        <div>
          <h2 className="font-extrabold text-3xl tracking-tight text-gray-900">
            Popular <span className="text-primary capitalize">{category}</span> Spots
          </h2>
          <p className="text-gray-500 mt-1">Discover the best-rated places in your area.</p>
        </div>
        <span className="px-4 py-1.5 bg-primary/10 text-primary font-semibold rounded-full text-sm border border-primary/20">
          {businesses?.length || 0} results found
        </span>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses?.length > 0 ? (
          businesses.map((business) => (
            <Link href={'/restaurant/'+business?.slug}
              key={business.id} 
              className="group cursor-pointer bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image 
                  src={business.banner.url} 
                  alt={business.name} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <button className="bg-white text-black text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>

             
              <div className="p-5">
                <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-primary transition-colors">
                  {business.name}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <span className="truncate">{business.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span>{business.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star fill="yellow"  size={20} className="text-primary" />
                    <span>{calculateRating(business).toFixed(1)}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t mt-3">
                    <Info size={16} className="text-gray-400 mt-0.5 shrink-0" />
                    <p className="line-clamp-2 italic text-gray-500">
                      {business.aboutUs}
                    </p>
                  </div>
                  
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed">
            <p className="text-gray-400">No businesses found in this category.</p>
          </div>
        )}
      </div>
    </div>
    )
}
export default BusinessList;