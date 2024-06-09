'use client'
import { useEffect, useState } from 'react'
import { useStore } from '@/store/useStore'
import Cards from './Cards'
import Loading from './Loading'
import { ErrorHandle } from './ErrorHandle'

type ProfileProps = {
  profileLink: (userId: string) => void
}

const BlogList = ({ profileLink }: ProfileProps) => {
  const { blogs, fetchAllBlogs } = useStore()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchdata() {
      
      try {
        await fetchAllBlogs()
      setLoading(false)  
      } catch (error) {
        ErrorHandle(error)
      }
    }
    setLoading(true)
    fetchdata()
  }, [fetchAllBlogs])

  if (loading)
    return (
      <>
        <Loading />
      </>
    )

  return (
    <div className='flex h-screen w-full items-center justify-center '>
      <div className='grid grid-cols-3 gap-4 '>
        {blogs.map(blog => (
          <Cards key={blog.id} user={blog.user} blog={blog} profileLink={profileLink} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
