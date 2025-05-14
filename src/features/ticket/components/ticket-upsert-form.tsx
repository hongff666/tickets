'use client'

import { Ticket } from '@prisma/client'
import Form from 'next/form'
import { useActionState, useMemo } from 'react'

import { FieldError } from '@/components/form/field-error'
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback'
import { SubmitButton } from '@/components/form/submmit-button'
import {
  ActionState,
  EMPTY_ACTION_SATE,
} from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { upsertTicket } from '../actions/upsert-ticket'

type TicketUpsertProps = {
  ticket?: Ticket
}

export const TicketUpsertForm = ({ ticket }: TicketUpsertProps) => {
  const [formState, formAction] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_SATE,
  )

  useActionFeedback(
    formState,
    useMemo(
      () => ({
        onSuccess: ({ actionState }: { actionState: ActionState }) => {
          if (actionState.message) {
            toast.success(actionState.message)
          }
        },
        onError: ({ actionState }: { actionState: ActionState }) => {
          if (actionState.message) {
            toast.error(actionState.message)
          }
        },
      }),
      [],
    ),
  )

  return (
    <Form action={formAction} className="flex flex-col gap-y-2">
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

      <SubmitButton label={ticket ? 'Update' : 'Create'} />
    </Form>
  )
}
