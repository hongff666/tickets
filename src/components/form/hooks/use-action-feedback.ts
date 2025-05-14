import { useEffect, useRef } from 'react'
import { ActionState } from '../utils/to-action-state'

type OnArgs = { actionState: ActionState }

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void
  onError?: (onArgs: OnArgs) => void
}

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const preTimestamp = useRef(actionState.timestamp)
  const isUpdate = actionState.timestamp !== preTimestamp.current

  useEffect(() => {
    if (isUpdate) {
      if (actionState.status === 'SUCCESS') {
        options.onSuccess?.({ actionState })
      } else if (actionState.status === 'ERROR') {
        options.onError?.({ actionState })
      }
      preTimestamp.current = actionState.timestamp
    }
  }, [actionState, isUpdate, options])
}

export { useActionFeedback }
