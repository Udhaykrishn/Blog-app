import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { LuLayoutDashboard } from 'react-icons/lu'
import { FaBlogger } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { FcAbout } from "react-icons/fc";

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { userId } = auth()
  return (
    <header className='py-4'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-10 text-sm font-medium'>
          {userId ? (
            <>
              <li className='w-[100px] h-full text-xl'>
                <Link href={'/dashboard'}>
                  <LuLayoutDashboard />
                  Dashboard
                </Link>
              </li>
              <li className='w-[100px] h-full text-xl'>
                <Link href={'/blogs'}>
                  <FaBlogger />
                  Blogs
                </Link>
              </li>
              <li className='w-[100px] h-full text-xl'>
                <Link href={'/me'}>
                  <FcAbout />
                  Me
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className='w-[100px] h-full text-xl'>
                <Link href={'/'}>
                  <IoHomeOutline />
                  Home
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className='flex items-center justify-between gap-6'>
          <ThemeToggle />

          <SignedOut>
            <SignInButton mode='modal'>
              <Button size='sm'>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}
