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
import { Button } from '@/components/ui/button'
import { cloneElement, useState } from 'react'

interface WithClickHandler {
  onClick?: (e: React.MouseEvent) => void
}

type useCustomDialogProps = {
  title?: string
  description?: string
  action: () => Promise<void>
  trigger: React.ReactElement<WithClickHandler>
}

export const useCustomdDialog = ({
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed with this action?',
  action,
  trigger,
}: useCustomDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

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
            <form action={action}>
              <Button type="submit" className="w-full">
                Confirm
              </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}
