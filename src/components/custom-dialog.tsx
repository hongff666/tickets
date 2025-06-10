'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  cloneElement,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'
import { useActionFeedback } from './form/hooks/use-action-feedback'
import { ActionState, EMPTY_ACTION_SATE } from './form/utils/to-action-state'
import { Button } from './ui/button'

interface WithClickHandler {
  onClick?: (e: React.MouseEvent) => void
}

type useCustomDialogProps = {
  title?: string
  description?: string
  action: () => Promise<ActionState>
  trigger: React.ReactElement<WithClickHandler>
  onSuccess?: (actionState: ActionState) => void
}

export const useCustomDialog = ({
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed with this action?',
  action,
  trigger,
  onSuccess,
}: useCustomDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_SATE,
  )

  const toastRef = useRef<ReturnType<typeof toast.loading>>(undefined)
  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading('Deleting ...')
    } else {
      toast.dismiss(toastRef.current)
    }
  }, [isPending])

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      setIsOpen((state) => !state)
    },
  })

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }: { actionState: ActionState }) => {
      if (actionState.message) {
        toast.success(actionState.message)
      }

      onSuccess?.(actionState)
    },
    onError: ({ actionState }: { actionState: ActionState }) => {
      if (actionState.message) {
        toast.error(actionState.message)
      }
    },
  })

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}
