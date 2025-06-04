import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/features/auth/actions/sign-out'
import { accountPasswordPath, accountPoriflePath } from '@/paths'
import { User } from '@prisma/client'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { LucideLock, LucideLogOut, LucideUser } from 'lucide-react'
import Link from 'next/link'

type AccountDropdownProps = {
  user: User
}

export const AccountDropdown = ({ user }: AccountDropdownProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="border" />
          <DropdownMenuItem asChild>
            <Link href={accountPoriflePath()}>
              <LucideUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={accountPasswordPath()}>
              <LucideLock className="mr-2 h-4 w-4" />
              <span>Password</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border" />
          <DropdownMenuItem asChild>
            <form action={signOut}>
              <LucideLogOut className="mr-2 h-4 w-4" />
              <button type="submit">Sign Out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
