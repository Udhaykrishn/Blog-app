import React from 'react'
import { auth } from '@clerk/nextjs/server'

const page = () => {
  const { userId } = auth()
  return (
    <>
      <h2 className='container'>Blogs {userId}</h2>
    </>
  )
}

export default page
