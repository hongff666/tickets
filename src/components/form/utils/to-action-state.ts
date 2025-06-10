import { ZodError } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionState<T = any> = {
  status?: 'SUCCESS' | 'ERROR'
  message: string | null
  fieldErrors?: Record<string, string[] | undefined>
  payload?: FormData
  timestamp: number
  data?: T
}

export const EMPTY_ACTION_SATE: ActionState = {
  message: null,
  fieldErrors: {},
  payload: undefined,
  timestamp: Date.now(),
}

export const fromErrorToActionState = (
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
  formData?: FormData,
  data?: unknown,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
    data,
  }
}
