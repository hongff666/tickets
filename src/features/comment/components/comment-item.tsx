import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CommentWithMetadata } from '../types'

type CommentItemProps = {
  comment: CommentWithMetadata
  buttons?: Array<React.ReactNode>
}

export const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <div className="flex gap-x-2">
      <Card className="flex-1">
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

      <div className="flex flex-col gap-y-2">{buttons}</div>
    </div>
  )
}
