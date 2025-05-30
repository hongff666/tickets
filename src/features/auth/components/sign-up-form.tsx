'use client'

import { FieldError } from '@/components/form/field-error'
import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submmit-button'
import { EMPTY_ACTION_SATE } from '@/components/form/utils/to-action-state'
import { Input } from '@/components/ui/input'
import { useActionState } from 'react'
import { SignUp } from '../actions/sign-up'

const SignUpForm = () => {
  const [actionState, formAction] = useActionState(SignUp, EMPTY_ACTION_SATE)
  return (
    <Form action={formAction} actionState={actionState}>
      <Input name="username" placeholder="Username" />
      <FieldError actionState={actionState} name="username" />

      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Input type="password" name="password" placeholder="Password" />
      <FieldError actionState={actionState} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  )
}

export default SignUpForm
