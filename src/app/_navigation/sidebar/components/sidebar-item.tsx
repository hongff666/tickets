import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import { cloneElement } from 'react'
import { closedClassName } from '../constants'
import { NavItem } from '../types'

type SidebarItemProps = {
  isOpen: boolean
  isActive?: boolean
  navItem: NavItem
}
export const SidebarItem = ({
  isOpen,
  isActive,
  navItem,
}: SidebarItemProps) => {
  return (
    <>
      {navItem.separator && <Separator className="border" />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group relative flex h-12 justify-start',
          isActive && 'bg-muted hover:bg-muted font-bold',
        )}
      >
        {cloneElement(navItem.icon, {
          // @ts-expect-error -- className is defined in the icon component
          className: cn('h-5 w-5'),
        })}
        <span
          className={cn(
            'absolute left-12 text-base duration-200',
            isOpen ? 'hidden md:block' : 'w-[78px]',
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  )
}
