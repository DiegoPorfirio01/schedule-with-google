import { getCurrentUser } from "@/lib/session"
import { MultStepRegisterUser } from "@/components/multStepRegister/MultStepRegisterUser"

export default async function MultStep() {
  const user = await getCurrentUser()

  return (
    <>
      <MultStepRegisterUser user={user} />
    </>
  )
}
