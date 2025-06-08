import { CardCompact } from '@/components/card-compact'
import { getAuth } from '@/features/auth/actions/get-auth'
import { isOwner } from '@/features/auth/utils/is-owner'
import { getComments } from '../queries/get-comments'
import { CommentDeleteButton } from './comment-delete-button'
import { CommentItem } from './comment-item'
import { CreateCommentForm } from './create-comment-form'

type CommentsProps = {
  ticketId: string
}
export const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId)
  const { user } = await getAuth()
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
              ...(isOwner(user, comment)
                ? [<CommentDeleteButton key={0} id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  )
}
