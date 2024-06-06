'use client'

import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const {userId} = useParams<{ userId: string }>()
  

  return (
    <div className='container'>
      <h2>hello world {userId}</h2>
    </div>
  )
}

export default Page