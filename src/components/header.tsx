'use client'

import { LucideKanban, LucideLogOut } from 'lucide-react'
import Link from 'next/link'

import { homePath, signInPath, signUpPath } from '@/paths'

import { signOut } from '@/features/auth/actions/sign-out'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { SubmitButton } from './form/submmit-button'
import { ThemeSwitcher } from './theme/theme-switcher'
import { buttonVariants } from './ui/button'

const Header = () => {
  const { user, isFetched } = useAuth()

  const navItems = user ? (
    <form action={signOut}>
      <SubmitButton icon={<LucideLogOut />} />
    </form>
  ) : (
    <>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={signUpPath()}
      >
        Sign Up
      </Link>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={signInPath()}
      >
        Sign In
      </Link>
    </>
  )

  if (!isFetched) {
    return null
  }

  return (
    <nav className="supports-backdrop-blur:bg-background/60 bg-background/95 animate-header-from-top fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur">
      <div className="flex items-center gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: 'ghost' })}
        >
          <LucideKanban />
          <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  )
}

export { Header }
