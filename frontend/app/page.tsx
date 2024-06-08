"use client"

import { useAuth } from '@clerk/nextjs'
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
 if(isSignedIn){
  router.push("/dashboard")
 }  
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Blogger Application</h1>
      </div>
    </section>
  )
}
