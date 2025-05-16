import { useMemo } from 'react'
import { toast } from 'sonner'
import { useActionFeedback } from './hooks/use-action-feedback'
import { ActionState } from './utils/to-action-state'

type FormProps = {
  action: (payload: FormData) => void
  actionState: ActionState
  children: React.ReactNode
}

export const Form = ({ action, actionState, children }: FormProps) => {
  useActionFeedback(
    actionState,
    useMemo(
      () => ({
        onSuccess: ({ actionState }: { actionState: ActionState }) => {
          if (actionState.message) {
            toast.success(actionState.message)
          }
        },
        onError: ({ actionState }: { actionState: ActionState }) => {
          if (actionState.message) {
            toast.error(actionState.message)
          }
        },
      }),
      [],
    ),
  )

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  )
}
