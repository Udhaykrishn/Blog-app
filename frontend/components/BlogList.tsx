'use client'
import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import Cards from './Cards'

type ProfileProps = {
  profileLink: (userId: string) => void
}

const BlogList = ({ profileLink }: ProfileProps) => {
  const { blogs, fetchAllBlogs } = useStore()

  useEffect(() => {
    fetchAllBlogs()
  }, [fetchAllBlogs])

  return (
    <div className='flex h-screen w-full items-center justify-center '>
      <div className='gap-4 grid grid-cols-3 '>
        {blogs.map(blog => (
          <Cards user={blog.user} blog={blog} profileLink={profileLink} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
