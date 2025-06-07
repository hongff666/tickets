import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommentWithMetadata } from '../types'

type CommentItemProps = {
  comment: CommentWithMetadata
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-muted-foreground">
            {comment.user?.username}
          </span>
          <span className="text-muted-foreground">
            {new Date(comment.createdAt).toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{comment.content}</p>
      </CardContent>
    </Card>
  )
}
