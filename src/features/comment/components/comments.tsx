'use client'

import { CardCompact } from '@/components/card-compact'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { getComments } from '../queries/get-comments'
import { CommentWithMetadata } from '../types'
import { CommentDeleteButton } from './comment-delete-button'
import { CommentItem } from './comment-item'
import { CreateCommentForm } from './create-comment-form'

type CommentsProps = {
  ticketId: string
  paginatedComments: {
    list: CommentWithMetadata[]
    metadata: {
      count: number
      hasNextPage: boolean
    }
  }
}
export const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list || [])
  const [metadata, setMetadata] = useState(paginatedComments.metadata)

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, comments.length)
    const moreComments = morePaginatedComments.list || []
    setComments((prevComments) => [...prevComments, ...moreComments])
    setMetadata(morePaginatedComments.metadata)
  }
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

      {metadata.hasNextPage && (
        <div className="ml-8 mt-4 flex flex-col justify-center">
          <Button variant="ghost" onClick={handleMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  )
}
