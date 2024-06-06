'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useProfileStore } from '@/store/useStore'

const Page = () => {
  const { userId } = useParams<{ userId: string }>()
  const { user, fetchUserById } = useProfileStore()

  useEffect(() => {
    fetchUserById(userId)
  }, [fetchUserById, userId])
  console.log(user.email)
  return (
    <div className='container'>
      {
        <>
          <p>{user.email}</p>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <img className='h-[200px] w-[200px]' src={user.image_url} alt='' />
        </>
      }
    </div>
  )
}

export default Page
