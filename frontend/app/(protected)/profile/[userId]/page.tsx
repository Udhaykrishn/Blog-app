'use client'
import { useStore } from '@/store/useStore'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {
  const { userId } = useParams<{ userId: string }>()
  const { user, fetchUserById } = useStore()

  useEffect(() => {
    fetchUserById(userId)
  }, [fetchUserById, userId])

  const blogCount = user?._count?.blogs

  return (
    <div className='container'>
      <ul>
        {user && (
          <>
            <p>{user?.email}</p>
            <p>{user?.firstName}</p>
            <p>{user?.lastName}</p>
            <img className='h-[200px] w-[200px]' src={user?.image_url} />
            {blogCount && <p>Blog Count: {blogCount}</p>}
          </>
        )}
      </ul>
    </div>
  )
}

export default Page
