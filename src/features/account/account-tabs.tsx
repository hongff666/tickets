'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { accountPasswordPath, accountPoriflePath } from '@/paths'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AccountTabs = () => {
  const pathname = usePathname()
  return (
    <Tabs value={pathname.includes('password') ? 'password' : 'profile'}>
      <TabsList>
        <TabsTrigger value="profile" asChild>
          <Link href={accountPoriflePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
