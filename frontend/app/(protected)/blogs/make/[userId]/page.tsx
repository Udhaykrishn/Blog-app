'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import BlogCreateForm from '@/components/BlogCreateForm'

const page = () => {
  const { userId } = useParams<{ userId: string }>()
  return (
    <>
      <BlogCreateForm />
    </>
  )
}

export default page
