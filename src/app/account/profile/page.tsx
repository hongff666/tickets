import { Heading } from '@/components/heading'
import { AccountTabs } from '@/features/account/components/account-tabs'

const ProfilePage = async () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Profile"
        description="All about your profile"
        tabs={<AccountTabs />}
      ></Heading>
    </div>
  )
}

export default ProfilePage
