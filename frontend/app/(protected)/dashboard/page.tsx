'use client'
import BlogList from '@/components/BlogList'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter()

  const navigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`)
  }

  return (
    <div className='container'>
      <h1>Dashboard</h1>
      <h2>All Blogs</h2>

      <BlogList profileLink={navigateToProfile} />
    </div>
  )
}

export default page
