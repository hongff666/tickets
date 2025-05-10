import { LucideKanban } from 'lucide-react'
import Link from 'next/link'

import { homePath, ticketsPath } from '@/paths'

import { ThemeSwitcher } from './theme/theme-switcher'
import { buttonVariants } from './ui/button'

const Header = () => {
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
        <Link
          className={buttonVariants({ variant: 'default' })}
          href={ticketsPath()}
        >
          Tickets
        </Link>
      </div>
    </nav>
  )
}

export { Header }
