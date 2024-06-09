'use client'

import EditBlogs from '@/components/EditBlogs'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
  const { blogId } = useParams<{ blogId: string }>()
  return (
    <div className='container'>
      <EditBlogs key={blogId} id={blogId} />
    </div>
  )
}

export default page
