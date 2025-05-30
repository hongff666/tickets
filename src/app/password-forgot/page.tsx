export default async function PasswordForgotPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Forgot Password</h1>
        <p className="mb-6 text-gray-600">
          Enter your email address to receive a password reset link.
        </p>
        {/* Password forgot form will go here */}
      </div>
    </div>
  )
}
