import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'


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
              <li>
                <Link href={'/dashboard'}>Dashboard</Link>
              </li>
              <li>
                <Link href={'/blogs'}>Blogs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={'/hom'}>Home</Link>
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
