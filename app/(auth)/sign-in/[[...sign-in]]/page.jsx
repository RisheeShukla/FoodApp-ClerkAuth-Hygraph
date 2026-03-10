import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center bg-gray-50 dark:bg-gray-950">
  {/* Content Wrapper */}
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl text-gray-900 dark:text-white">
        Welcome Back
      </h1>

      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Please enter your details to sign in to your account.
      </p>

      <div className="mt-8 text-left">
        <SignIn />
      </div>
    </div>
  </div>

  {/* Hero Image Section */}
  <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt="Sign In Background"
      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1160"
      className="absolute inset-0 h-full w-full object-cover lg:rounded-l-[3rem] shadow-2xl"
    />
    
    {/* Optional: Subtle Overlay to make the image feel more integrated */}
    <div className="absolute inset-0 bg-gray-900/10 lg:rounded-l-[3rem]"></div>
  </div>
</section>
  )
}