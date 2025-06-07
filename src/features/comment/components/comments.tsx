import { CardCompact } from '@/components/card-compact'
import { getComments } from '../queries/get-comments'
import { CommentItem } from './comment-item'
import { CreateCommentForm } from './create-comment-form'

type CommentsProps = {
  ticketId: string
}
export const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId)

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
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  )
}
