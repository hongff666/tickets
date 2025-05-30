import { CardCompact } from '@/components/card-compact'
import SignUpForm from '@/features/auth/components/sign-up-form'
import { signInPath } from '@/paths'
import Link from 'next/link'

export default async function SignUpPage({}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <CardCompact
        title="Sign Up"
        description="Please provide your details to create an account."
        content={<SignUpForm />}
        className="w-full max-w-[420px] self-center"
        footer={
          <Link
            className="text-muted-foreground hover:text-primary-foreground text-sm"
            href={signInPath()}
          >
            Already have an account? Sign In
          </Link>
        }
      />
    </div>
  )
}
