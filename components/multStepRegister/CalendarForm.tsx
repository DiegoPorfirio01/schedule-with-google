"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowRight, CalendarCheck2 } from "lucide-react"
import { signIn } from "next-auth/react"

import { Button } from "../ui/button"
import FormWrapper from "./FormWrapper"

interface CalendarFormProps {
  isLogged: boolean
  nextStep: () => void
}

export const CalendarForm = ({ isLogged, nextStep }: CalendarFormProps) => {
  const error = useSearchParams()?.has("error")
  const [isLoading, setIsLoading] = useState(false)

  const signGoogleCalendar = async () => {
    setIsLoading(true)
    const response = await signIn("google", { callbackUrl: "/register" })

    if (response?.status === 200) {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <FormWrapper
        title="Conecte sua agenda !"
        description="Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados."
      >
        {isLogged ? (
          <button
            disabled={true}
            className="mt-2 cursor-not-allowed rounded-md border border-[#77f6aa] bg-neutral-900 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#77f6aa]">Conectado</p>
              </div>
              <CalendarCheck2 className="text-white" />
            </div>
          </button>
        ) : (
          <button
            onClick={() => {
              signGoogleCalendar()
            }}
            className="mt-2 cursor-pointer rounded-md border border-neutral-700 bg-neutral-900 p-4 hover:bg-neutral-700"
          >
            {isLoading ? (
              <p className="text-neutral-400">Carregando...</p>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#77f6aa]">Conectar ao</p>
                  </div>
                </div>
                <div className="my-2 flex items-center justify-between">
                  <p className="text-neutral-400">Google Calendar</p>
                  <CalendarCheck2 className="text-white" />
                </div>
              </div>
            )}

            {error && (
              <p className="text-justify text-red-500">
                Erro ao conectar, verifique se você deu os acessos ao aplicativo
                e tente novamente !
              </p>
            )}
          </button>
        )}
      </FormWrapper>
      <Button variant={"wired"} disabled={!isLogged} onClick={() => nextStep()}>
        Próximo passo <ArrowRight className="ml-3" />
      </Button>
    </div>
  )
}

export default CalendarForm
