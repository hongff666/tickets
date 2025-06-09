'use client'

import { useCustomDialog } from '@/components/custom-dialog'
import { Button } from '@/components/ui/button'
import { LucideTrash } from 'lucide-react'
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
    trigger: (
      <Button variant="destructive" size="icon">
        <LucideTrash className="h-4 w-4" />
      </Button>
    ),
    onSuccess: (_actionState) => onDeleteComment?.(id),
  })
  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  )
}
