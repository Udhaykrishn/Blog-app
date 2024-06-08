'use client'
import React, { useEffect, Suspense, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FaBookReader, FaEdit } from 'react-icons/fa'
import Loading from '@/components/Loading'
import DeleteBlogDialog from '@/components/DeleteAlert'
import { ErrorHandle } from '@/components/ErrorHandle'

const Page = () => {
  const { userId } = useAuth()
  const { blogs, getAllBlogById } = useStore()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData(userId: any) {
      try {
        if (userId) { 
          await getAllBlogById(userId)
          setLoading(false)
        }
      } catch (error) {
        ErrorHandle(error)
        setLoading(true)
      }
    }
    setLoading(true)
    fetchData(userId)
  }, [])

  if (loading) return <Loading />

  return (
    <div className='container flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4 dark:bg-gray-900'>
      <div className='mb-6 flex w-full items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
          Your Blogs
        </h1>
        <Button
          className='border-3 h-10 border-sky-500'
          onClick={() => router.push(`/blogs/make/${userId}`)}
          variant={'secondary'}
        >
          <div className='mr-2 text-2xl'>
            <FaEdit />
          </div>
          Make Blog
        </Button>
      </div>
      <Suspense fallback={<Loading />}>
        <div className='mx-auto w-full space-y-6 md:w-[60%]'>
          {blogs && blogs.length > 0 ? (
            blogs.map(data => (
              <div
                key={data.id}
                className='flex flex-col justify-between space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'
              >
                <div>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                    # <span>{data.title}</span>
                  </h2>
                </div>
                <div className='flex items-center justify-between'>
                  <Button
                    className='mr-2 hover:bg-sky-500 hover:text-white'
                    variant='secondary'
                    onClick={() => router.push(`/blogs/read/${data.id}`)}
                  >
                    Read <FaBookReader className='ml-2' />
                  </Button>
                  <div className='flex space-x-2'>
                    <Button
                      className='bg-gray-800 hover:bg-gray-700 hover:text-white'
                      variant='ghost'
                      onClick={() => router.push(`/blogs/edit/${data.id}`)}
                    >
                      Edit <FaEdit className='ml-2' />
                    </Button>
                    <DeleteBlogDialog blogId={data.id} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-500 dark:text-gray-400'>No blogs found</p>
          )}
        </div>
      </Suspense>
    </div>
  )
}

export default Page
