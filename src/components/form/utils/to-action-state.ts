import { ZodError } from 'zod'

export type ActionState = {
  status?: 'SUCCESS' | 'ERROR'
  message: string | null
  fieldErrors?: Record<string, string[] | undefined>
  payload?: FormData
  timestamp: number
}

export const EMPTY_ACTION_SATE: ActionState = {
  message: null,
  fieldErrors: {},
  payload: undefined,
  timestamp: Date.now(),
}

export const fromToActionState = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR',
      message: null,
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    }
  } else if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      payload: formData,
      timestamp: Date.now(),
    }
  } else {
    return {
      status: 'ERROR',
      message: 'An unknown error occurred',
      payload: formData,
      timestamp: Date.now(),
    }
  }
}

export const toActionState = (
  status: ActionState['status'],
  message: string,
): ActionState => {
  return {
    status,
    message,
    timestamp: Date.now(),
  }
}
