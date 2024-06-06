'use client'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { IBlog, IUser } from '@/store/types/IBlog'

type CardsProps = {
  user: IUser
  blog: IBlog
  profileLink: (userId: string) => void
}

export default function Cards({ user, blog, profileLink }: CardsProps) {
  return (
    <Card className='mt-3 w-[350px] md:w-[600px]'>
      <CardHeader>
        <CardTitle>
          <Button onClick={() => profileLink(user.userId)} variant={'link'}>
            {user.firstName}
          </Button>
        </CardTitle>
        <CardDescription className='text-2xl'>{blog.title}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={() => alert(blog.description)} variant='default'>
          Read
        </Button>
      </CardFooter>
    </Card>
  )
}
