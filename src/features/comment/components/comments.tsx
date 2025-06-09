'use client'

import { CardCompact } from '@/components/card-compact'
import { CommentWithMetadata } from '../types'
import { CommentDeleteButton } from './comment-delete-button'
import { CommentItem } from './comment-item'
import { CreateCommentForm } from './create-comment-form'

type CommentsProps = {
  ticketId: string
  comments?: CommentWithMetadata[]
}
export const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
  return (
    <>
      <CardCompact
        title="Create Comment"
        description="Share your thoughts or feedback on this ticket."
        className="mb-4"
        content={<CreateCommentForm ticketId={ticketId} />}
      />

      <div className="ml-10 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [<CommentDeleteButton key={0} id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  )
}
