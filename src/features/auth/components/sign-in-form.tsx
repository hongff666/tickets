'use client'

import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submmit-button'
import { EMPTY_ACTION_SATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { useActionState } from 'react'
import { SignIn } from '../actions/sign-in'

const SignInForm = () => {
  const [actionState, formAction] = useActionState(SignIn, EMPTY_ACTION_SATE)
  return (
    <Form action={formAction} actionState={actionState}>
      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Input type="password" name="password" placeholder="Password" />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  )
}

export default SignInForm
