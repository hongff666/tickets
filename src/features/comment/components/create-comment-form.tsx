'use client'

import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submmit-button'
import { EMPTY_ACTION_SATE } from '@/components/form/utils/to-action-state'
import { Textarea } from '@/components/ui/textarea'
import { useActionState } from 'react'
import { createComment } from '../actions/create-comment'

type CreateCommentFormProps = {
  ticketId: string
}

export const CreateCommentForm = ({ ticketId }: CreateCommentFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_SATE,
  )
  return (
    <Form action={action} actionState={actionState}>
      <Textarea
        name="content"
        placeholder="Write your comment here..."
        required
        className="w-full"
      />
      <FieldError name="content" actionState={actionState} />

      <SubmitButton label="Create Comment" />
    </Form>
  )
}
