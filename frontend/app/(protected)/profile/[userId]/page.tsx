'use client'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FaHeading, FaBookReader } from 'react-icons/fa'
import { ErrorHandle } from '@/components/ErrorHandle'

const Page = () => {
  const { userId } = useParams() as { userId: string }
  const { info, blogs, fetchUserById, getAllBlogById } = useStore()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserById(userId)
        await getAllBlogById(userId)
      } catch (error: any) {
        ErrorHandle(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, fetchUserById, getAllBlogById])

  if (loading) {
    return <Loading />
  }

  const handleBlogRead = (blogId: string) => {
    router.push(`/blogs/read/${blogId}`)
  }

  let blogCount = 0

  if (!Array.isArray(info)) {
    blogCount = info._count.blogs
  }

  return (
    <div className='container mx-auto mt-10 p-4'>
      {!Array.isArray(info) && (
        <Card className='mx-auto max-w-lg border-none shadow-lg'>
          <CardHeader className='p-4'>
            <div className='flex items-center'>
              <img
                className='h-24 w-24 rounded-full border-2 border-gray-300'
                src={info?.image_url}
                alt={`${info?.firstName} ${info?.lastName}`}
              />
              <div className='ml-6'>
                <h2 className='text-3xl font-semibold'>
                  {info?.firstName} {info?.lastName}
                </h2>
                <p className='text-gray-600'>{info?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-4'>
            {blogCount !== undefined && (
              <div className='mt-4 flex flex-col items-center justify-center'>
                <Badge
                  color='blue'
                  className='mb-2 px-4 py-2 text-lg sm:px-6 sm:py-3 sm:text-xl'
                >
                  Blog Count
                </Badge>
                <span className='text-xl font-bold'>{blogCount}</span>
              </div>
            )}
          </CardContent>
          <h3 className='mb-4 text-xl font-semibold'>
            {info.firstName}'s Blogs
          </h3>
          <CardFooter className='p-4'>
            <>
              {blogs.map(data => (
                <div className='h-16 w-full' key={data.id}>
                  <div className='mb-4'>
                    <div className='flex items-center justify-between'>
                      <p className='flex items-center text-lg font-medium'>
                        <FaHeading className='mr-3' /> #{data.title}
                      </p>
                      <Button onClick={() => handleBlogRead(data.id)}>
                        <FaBookReader className='mr-2' />
                        Read
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </CardFooter>
        </Card>
        // <p>Hello world</p>
      )}
    </div>
  )
}

export default Page
