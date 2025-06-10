'use client'

import { useCustomDialog } from '@/components/custom-dialog'
import { Button } from '@/components/ui/button'
import { LucideLoaderCircle, LucideTrash } from 'lucide-react'
import { deleteComment } from '../actions/delete-comment'

type CommentDeleteButtonProps = {
  id: string
  onDeleteComment?: (id: string) => void
}

export const CommentDeleteButton = ({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useCustomDialog({
    action: deleteComment.bind(null, id),
    trigger: ({ isPending }) => (
      <Button variant="destructive" size="icon" disabled={isPending}>
        {isPending ? (
          <LucideLoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <LucideTrash className="h-4 w-4" />
        )}
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(id),
  })
  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  )
}
