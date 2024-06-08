'use client'

import EditBlogs from '@/components/EditBlogs'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {
  const { userId } = useParams<{ userId: string }>()
  console.log(userId[0])
  return (
    <div className='container'>
      <EditBlogs id={userId[0]} />
    </div>
  )
}

export default page
