'use client'

import { LucideKanban, LucideLogOut } from 'lucide-react'
import Link from 'next/link'

import { homePath, signInPath, signUpPath, ticketsPath } from '@/paths'

import { getAuth } from '@/features/auth/actions/get-auth'
import { signOut } from '@/features/auth/actions/sign-out'
import type { User } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitButton } from './form/submmit-button'
import { ThemeSwitcher } from './theme/theme-switcher'
import { buttonVariants } from './ui/button'

const Header = () => {
  const pathname = usePathname()
  useEffect(() => {
    const fetchUser = async () => {
      const auth = await getAuth()
      setUser(auth.user)
    }

    fetchUser()
  }, [pathname])

  const [user, setUser] = useState<User | null>(null)

  const navItems = user ? (
    <>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={ticketsPath()}
      >
        Tickets
      </Link>
      <form action={signOut}>
        <SubmitButton icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={signUpPath()}
      >
        Sign Up
      </Link>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={signInPath()}
      >
        Sign In
      </Link>
    </>
  )

  return (
    <nav className="supports-backdrop-blur:bg-background/60 bg-background/95 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur">
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
