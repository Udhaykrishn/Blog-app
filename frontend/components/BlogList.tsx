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
    <div className='flex h-screen w-full items-center justify-center'>
      <ul>
        {blogs.map(blog => (
          <Cards user={blog.user} blog={blog} profileLink={profileLink} />
        ))}
      </ul>
    </div>
  )
}

export default BlogList
