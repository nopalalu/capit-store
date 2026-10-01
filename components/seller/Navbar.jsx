import React from 'react'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='sticky top-0 z-40 flex items-center px-4 md:px-8 h-16 justify-between border-b border-neutral-200 bg-white/90 backdrop-blur-md'>
      <button onClick={()=>router.push('/')} className="flex items-center gap-2.5" aria-label="Back to store">
        <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold">C</span>
        <span className="font-bold tracking-tight text-neutral-900">
          Capit <span className="text-emerald-700">Store</span>
        </span>
        <span className="ml-1 hidden sm:inline-flex items-center rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-semibold px-2.5 py-1">
          Seller
        </span>
      </button>
      <button className='bg-neutral-900 text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-700 transition'>Logout</button>
    </div>
  )
}

export default Navbar
