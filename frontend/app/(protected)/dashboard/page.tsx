'use client'
import BlogList from '@/components/BlogList'
import React from 'react'

const page = () => {
  return (
    <div className='container'>
      <h1>Dashboard</h1>
      <h2>All Blogs</h2>

      <BlogList />
    </div>
  )
}

export default page
