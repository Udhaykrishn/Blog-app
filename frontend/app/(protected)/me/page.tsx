'use client'
import React, { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { useAuth } from '@clerk/nextjs'

const page = () => {
  const { userId } = useAuth()
  const AllUserBlogs = useStore(state => state.getAllBlogById)
  const blogs = useStore(state => state.blogs)

  console.log(blogs)

  useEffect(() => {
    AllUserBlogs(userId)
  }, [AllUserBlogs, userId])

  console.log(userId)

  return <div className='container'></div>
}

export default page
