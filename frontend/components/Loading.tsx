'use client'

import * as React from 'react'

import { Progress } from '@/components/ui/progress'

function Loading() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Progress value={progress} className='w-16' />
    </div>
  )
}

export default Loading
