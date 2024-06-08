'use client'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FaHeading } from 'react-icons/fa'
import { FaBookReader } from 'react-icons/fa'

const Page = () => {
  const { userId } = useParams<{ userId: string }>()
  const { user, blogs, fetchUserById, getAllBlogById } = useStore()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserById(userId)
        await getAllBlogById(userId)
      } catch (error: any) {
        console.error('Error Fetching Data ', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId, fetchUserById])

  if (loading) {
    return <Loading />
  }

  const blogCount = user?._count?.blogs

  const handleBlogRead = (blogId: string) => {
    router.push(`/blogs/read/${blogId}`)
  }

  return (
    <div className='container mx-auto mt-10 p-4'>
      {user && (
        <Card className='mx-auto max-w-lg border-none shadow-lg'>
          <CardHeader className='p-4'>
            <div className='flex items-center'>
              <img
                className='h-24 w-24 rounded-full border-2 border-gray-300'
                src={user?.image_url}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
              <div className='ml-6'>
                <h2 className='text-3xl font-semibold'>
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className='text-gray-600'>{user?.email}</p>
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
            {user?.firstName}'s Blogs
          </h3>
          <CardFooter className='p-4'>
            <>
              {blogs.map(data => (
                <div className='h-16 w-full'>
                  <div key={data.id} className='mb-4 '>
                    <div className='flex items-center justify-between'>
                      <p className='flex items-center text-lg font-medium '>
                        {' '}
                        <FaHeading className='mr-3' />#{data.title}
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
      )}
    </div>
  )
}

export default Page
