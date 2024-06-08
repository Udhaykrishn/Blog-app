'use client'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Loading from '@/components/Loading'

const Page = () => {
  const { userId } = useParams<{ userId: string }>()
  const { user, fetchUserById } = useStore()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserById(userId)
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

  return (
    <div className='container mx-auto mt-10 p-4'>
      {user && (
        <Card className='mx-auto max-w-lg shadow-lg border-none'>
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
              <div className='flex flex-col items-center justify-center mt-4'>
                <Badge color='blue' className='mb-2 text-lg px-4 py-2 sm:text-xl sm:px-6 sm:py-3'>
                  Blog Count
                </Badge>
                <span className='text-xl font-bold'>{blogCount}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className='p-4'>
            <p className='text-center text-gray-500'>
              More information coming soon...
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default Page
