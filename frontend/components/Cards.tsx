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
import { IBlog, IUserBlog } from '@/store/types/IBlog'
import { ProfileAvatar } from './ProfileAvatar'
import { FaBookReader } from 'react-icons/fa'

type CardsProps = {
  user: IUserBlog
  blog: IBlog
  profileLink: (userId: string) => void
}

export default function Cards({ user, blog, profileLink }: CardsProps) {
  return (
    <Card className='mt-3 w-[300px] md:w-[400px]'>
      <CardHeader>
        <ProfileAvatar image_url={user?.image_url} name={user?.firstName} />
        <CardTitle>
          <Button onClick={() => profileLink(user?.userId)} variant={'link'}>
            {user?.firstName}
          </Button>
        </CardTitle>
        <CardDescription className='text-2xl'>{blog?.title}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className='flex justify-between'>
        <Button onClick={() => alert(blog?.description)} variant='default'>
          <FaBookReader />
          Read
        </Button>
      </CardFooter>
    </Card>
  )
}
