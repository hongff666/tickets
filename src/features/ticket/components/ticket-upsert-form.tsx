'use client'

import { Ticket } from '@prisma/client'
import Form from 'next/form'
import { useActionState } from 'react'

import { SubmitButton } from '@/components/form/submmit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { upsertTicket } from '../actions/upsert-ticket'

type TicketUpsertProps = {
  ticket?: Ticket
}

export const TicketUpsertForm = ({ ticket }: TicketUpsertProps) => {
  const [formState, formAction] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: '',
    },
  )
  return (
    <Form action={formAction} className="flex flex-col gap-y-4">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        className="w-full"
        defaultValue={
          (formState.payload?.get('title') as string) ?? ticket?.title
        }
      />
      <span>{formState.fieldErrors?.title}</span>
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        className="w-full"
        defaultValue={
          (formState.payload?.get('content') as string) ?? ticket?.content
        }
      />
      <span>{formState.fieldErrors?.content}</span>
      <SubmitButton label={ticket ? 'Update' : 'Create'} />

      {formState.message}
    </Form>
  )
}
