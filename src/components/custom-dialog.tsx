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
import { cloneElement, useActionState, useState } from 'react'
import { Form } from './form/form'
import { SubmitButton } from './form/submmit-button'
import { ActionState, EMPTY_ACTION_SATE } from './form/utils/to-action-state'

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

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_SATE)

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      setIsOpen((state) => !state)
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
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={(actionState) => {
                setIsOpen(false)
                onSuccess?.(actionState)
              }}
            >
              <SubmitButton label="confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}
