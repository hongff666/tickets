'use client'

import { Form } from '@/components/form/form'
import { Ticket } from '@prisma/client'
import { useActionState } from 'react'

import { FieldError } from '@/components/form/field-error'
import { SubmitButton } from '@/components/form/submmit-button'
import { EMPTY_ACTION_SATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fromCent } from '@/utils/currency'
import { upsertTicket } from '../actions/upsert-ticket'

type TicketUpsertProps = {
  ticket?: Ticket
}

export const TicketUpsertForm = ({ ticket }: TicketUpsertProps) => {
  const [formState, formAction] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_SATE,
  )

  return (
    <Form action={formAction} actionState={formState}>
      <div className="flex flex-col gap-2">
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
        <FieldError actionState={formState} name="title" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          className="w-full"
          defaultValue={
            (formState.payload?.get('content') as string) ?? ticket?.content
          }
        />
        <FieldError actionState={formState} name="content" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="title">Deadline</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            className="w-full"
            defaultValue={
              (formState.payload?.get('deadline') as string) ?? ticket?.deadline
            }
          />
          <FieldError actionState={formState} name="deadline" />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="bounty">Bounty($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            className="w-full"
            step=".01"
            defaultValue={
              (formState.payload?.get('bounty') as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty).toString() : '')
            }
          />
          <FieldError actionState={formState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? 'Update' : 'Create'} />
    </Form>
  )
}
