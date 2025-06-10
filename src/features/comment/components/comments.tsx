'use client'

import { CardCompact } from '@/components/card-compact'
import { PaginatedData } from '@/types/pagination'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getComments } from '../queries/get-comments'
import { CommentWithMetadata } from '../types'
import { CommentDeleteButton } from './comment-delete-button'
import { CommentItem } from './comment-item'
import { CreateCommentForm } from './create-comment-form'

type CommentsProps = {
  ticketId: string
  paginatedComments: PaginatedData<CommentWithMetadata>
}
export const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ['comments', ticketId]

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    })

  const comments = data.pages.flatMap((page) => page.list)

  const handleMore = () => {
    fetchNextPage()
  }

  const queryClient = useQueryClient()

  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey })

  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey })

  const { ref, inView, entry } = useInView()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage])

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="Share your thoughts or feedback on this ticket."
        className="mb-4"
        content={
          <CreateCommentForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />

      <div className="ml-10 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key={0}
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-xs italic">no more comments</p>
        )}
      </div>
    </>
  )
}
