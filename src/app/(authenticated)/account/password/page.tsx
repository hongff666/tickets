import { AccountTabs } from '@/app/(authenticated)/account/_navigation/account-tabs'
import { Heading } from '@/components/heading'

const PasswordPage = async () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Password"
        description="Change your password"
        tabs={<AccountTabs />}
      ></Heading>
    </div>
  )
}

export default PasswordPage
