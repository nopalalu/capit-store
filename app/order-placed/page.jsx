'use client'
import { useAppContext } from '@/context/AppContext'
import { useEffect } from 'react'

const OrderPlaced = () => {

  const { router } = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 5000)
  }, [])

  return (
    <div className='min-h-screen bg-neutral-50 flex flex-col justify-center items-center gap-6 px-6'>
      <div className="w-24 h-24 rounded-full bg-emerald-700 flex items-center justify-center">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold tracking-tight text-neutral-900">Order Placed Successfully</p>
        <p className="text-sm text-neutral-500 mt-2">Thank you for shopping with us. Redirecting to your orders…</p>
      </div>
      <div className="w-48 h-1 rounded-full bg-neutral-200 overflow-hidden">
        <div className="h-full bg-emerald-700 rounded-full animate-pulse" style={{ width: '60%' }}></div>
      </div>
    </div>
  )
}

export default OrderPlaced
