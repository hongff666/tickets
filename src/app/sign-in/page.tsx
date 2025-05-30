import { CardCompact } from '@/components/card-compact'
import SignInForm from '@/features/auth/components/sign-in-form'
import { passwordForgotPath, signUpPath } from '@/paths'
import Link from 'next/link'

export default async function SignInPage({}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Please provide your details to sign in to your account."
        content={<SignInForm />}
        className="w-full max-w-[420px] self-center"
        footer={
          <div className="flex w-full items-center justify-between">
            <Link
              className="text-muted-foreground hover:text-primary-foreground text-sm"
              href={signUpPath()}
            >
              Sign Up
            </Link>
            <Link
              className="text-muted-foreground hover:text-primary-foreground text-sm"
              href={passwordForgotPath()}
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  )
}
