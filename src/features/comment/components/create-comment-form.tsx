'use client'

import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submmit-button'
import {
  ActionState,
  EMPTY_ACTION_SATE,
} from '@/components/form/utils/to-action-state'
import { Textarea } from '@/components/ui/textarea'
import { useActionState } from 'react'
import { createComment } from '../actions/create-comment'
import { CommentWithMetadata } from '../types'

type CreateCommentFormProps = {
  ticketId: string
  onCreateComment?: (newComment: CommentWithMetadata) => void
}

export const CreateCommentForm = ({
  ticketId,
  onCreateComment,
}: CreateCommentFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_SATE,
  )

  const handleSuccessEvent = (
    actionState: ActionState<CommentWithMetadata>,
  ) => {
    if (actionState.data) {
      onCreateComment?.(actionState.data)
    }
  }

  return (
    <Form
      action={action}
      actionState={actionState}
      onSuccess={handleSuccessEvent}
    >
      <Textarea
        name="content"
        placeholder="Write your comment here..."
        className="w-full"
      />
      <FieldError name="content" actionState={actionState} />

      <SubmitButton label="Create Comment" />
    </Form>
  )
}
