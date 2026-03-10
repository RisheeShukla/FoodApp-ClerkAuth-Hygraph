import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-orange-50/50">
  <div className="mx-auto max-w-2xl text-center">
    {/* Highlighting the headline with a brand-aligned color */}
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
      Foodies? We’ve got you <span className="text-orange-600">covered.</span>
    </h2>

    <p className="mt-4 text-lg text-gray-600">
      From your local favorites to the big chains, we bring the best flavors 
      right to your doorstep in record time.
    </p>
  </div>

  {/* Changed grid gap and added a subtle shadow to cards for a "premium app" feel */}
  <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
    
    {/* Feature 1: Speed */}
    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-hover hover:shadow-md">
      <div className="inline-flex rounded-xl bg-orange-100 p-3 text-orange-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path>
        </svg>
      </div>

      <h3 className="mt-4 text-xl font-bold text-gray-900">Lightning Delivery</h3>
      <p className="mt-2 text-gray-600 leading-relaxed">
        Our average delivery time is under 30 minutes. Your food arrives hot, every single time.
      </p>
    </div>

    {/* Feature 2: Quality/Safety */}
    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-hover hover:shadow-md">
      <div className="inline-flex rounded-xl bg-green-100 p-3 text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      </div>

      <h3 className="mt-4 text-xl font-bold text-gray-900">Hygiene Guaranteed</h3>
      <p className="mt-2 text-gray-600 leading-relaxed">
        All partner restaurants follow 5-star safety protocols and eco-friendly packaging.
      </p>
    </div>

    {/* Feature 3: Variety/Configurable */}
    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-hover hover:shadow-md">
      <div className="inline-flex rounded-xl bg-red-100 p-3 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </div>

      <h3 className="mt-4 text-xl font-bold text-gray-900">Custom Cravings</h3>
      <p className="mt-2 text-gray-600 leading-relaxed">
        No onions? Extra spicy? Customize your meals exactly how you like them with one tap.
      </p>
    </div>

    {/* Modernized SignUp placement */}
    <div className="col-span-1 md:col-span-3 mt-12 flex justify-center">
        <SignUp className="w-full max-w-md rounded-2xl bg-orange-600 text-white font-bold py-4 shadow-lg hover:bg-orange-700 transition-colors" />
    </div>
  </div>
</div>
  )
}