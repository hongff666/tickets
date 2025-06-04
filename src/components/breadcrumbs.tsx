import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { LucideSlash } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

type BreadcrumbsProps = {
  breadcrumbs?: {
    title: string
    href?: string
  }[]
}

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs?.map((breadcrumb, index) => {
          let breadcrumbItem = (
            <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
          )
          if (breadcrumb.href) {
            breadcrumbItem = (
              <BreadcrumbLink asChild>
                <Link
                  href={breadcrumb.href}
                  className="flex items-center gap-1"
                >
                  {breadcrumb.title}
                </Link>
              </BreadcrumbLink>
            )
          }
          return (
            <Fragment key={breadcrumb.title + index}>
              {breadcrumbItem}
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <LucideSlash className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
