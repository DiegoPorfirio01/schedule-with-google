import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Configurações",
  description: "Configure seu perfil.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const linkAgenda =
    process.env.NEXT_PUBLIC_APP_URL + "/schedule/" + user.username

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Suas informações"
        text="Acesse ou compartilhe o link da sua agenda:"
      />
      {user.username ? (
        <div>
          <div className="flex items-center">
            <a
              href={linkAgenda}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 underline"
            >
              <p className="text-lg font-semibold">{linkAgenda}</p>
            </a>
          </div>
          <div className="grid gap-10">
            <UserNameForm user={{ id: user.id, name: user.name || "" }} />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-red-500">Sua agenda ainda não foi gerada.</p>
          <Button>
            <Link href="/register" className="text-primary-500">
              Clique aqui
            </Link>
          </Button>
        </div>
      )}
    </DashboardShell>
  )
}
