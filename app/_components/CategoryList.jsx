"use client";
import React, { useEffectEvent } from "react";
import { useEffect } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
function CategoryList() {
    const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
    const params=useSearchParams()
    useEffect(() => {
        getCategotyList();
      }, []);
      useEffect(()=>{
        setSelectedCategory(params.get('category'));
      },[params])
      /**
       * to get category list from backend and display it on the home page
       */
      const getCategotyList = () => {
       GlobalApi.GetCategories().then((res) => {
        console.log(res.categories);
        setCategories(res.categories);

       })
      }
    return (
       <section className="max-w-6xl mx-auto mt-12 px-4">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
      Categories
    </h2>
  </div>

  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
    {categories && categories.map((category) => (
      <Link href={'?category='+category.slug}
        key={category.id} 
        className={`group cursor-pointer flex flex-col items-center ${selectedCategory === category.slug ? 'text-primary shadow-md  shadow-orange-200 text-black' : 'text-gray-500'}`}
      >
        {/* The Frame: Prevents transparency issues by providing a solid, neutral base */}
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-orange-100 group-hover:shadow-sm transition-all duration-200">
          
          {/* The Image Wrapper: ensures the icon doesn't touch the edges */}
          <div className="relative w-10 h-10">
            <Image 
              src={category.icon.url} 
              alt={category.name} 
              fill // Use fill for absolute centering within the parent
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              sizes="40px"
            />
          </div>

        </div>
        
        <span className="mt-3 text-[11px] font-bold text-gray-500 uppercase group-hover:text-orange-600 transition-colors">
          {category.name}
        </span>
      </Link>
    ))}
  </div>
</section>
       
    )
}
export default CategoryList;