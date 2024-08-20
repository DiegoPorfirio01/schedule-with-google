"use client"

import React, { use, useEffect, useState } from "react"
import { RoughNotation } from "react-rough-notation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"

import CalendarStep from "../CalendarStep/page"
import ConfirmStep from "../ConfirmStep/page"

interface ScheduleFormProps {
  user: {
    username: string | null
    id: string | null
    image: string | null
    bio: string | null
    name: string | null
  }
}

const ScheduleForm = ({ user }: ScheduleFormProps) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  const [step, setStep] = useState(0)
  const [successMessage, setSuccessMessage] = useState(false)

  useEffect(() => {
    if (selectedDateTime) {
      setStep(1)
    }
  }, [selectedDateTime])

  return (
    <>
      <div className="relative flex items-center justify-center sm:w-2/3">
        <div className="absolute -top-20 left-0 w-full">
          <nav className="h-full rounded-md border border-neutral-700 bg-neutral-900 py-5 text-slate-200 md:p-5">
            <ul className="flex justify-center gap-2">
              <li className="flex flex-col items-start font-medium">
                <button
                  tabIndex={0}
                  className={`text-sm ${
                    0 === 0 ? "text-[#ffe666]" : "text-white"
                  } md:text-base`}
                >
                  <RoughNotation
                    type="underline"
                    show={step === 0}
                    color="#ffe666"
                  >
                    Selecionar Horário
                  </RoughNotation>
                </button>
              </li>
              <li className="flex flex-col items-start font-medium">
                <button
                  tabIndex={0}
                  className={`text-sm ${
                    step === 2 ? "text-[#6fe79f]" : "text-white"
                  } md:text-base`}
                >
                  <RoughNotation
                    type="underline"
                    show={step === 1}
                    color="#6fe79f"
                  >
                    Confirmar Agendamento
                  </RoughNotation>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className={`relative flex h-[420px] w-full max-w-4xl rounded border border-neutral-700 bg-[#262626] p-4 sm:h-auto`}
        >
          {step == 0 && (
            <CalendarStep onSelectDateTime={setSelectedDateTime} user={user} />
          )}

          {step == 1 && (
            <ConfirmStep
              schedulingDate={selectedDateTime}
              user={user}
              setStep={setStep}
              setSuccessMessage={setSuccessMessage}
            />
          )}
        </div>
      </div>
      {successMessage && (
        <Alert className="">
          <Icons.check />
          <AlertTitle>Agendamento realizado com sucesso !</AlertTitle>
          <AlertDescription>
            Em alguns minutos, confira sua agenda do google !
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}

export default ScheduleForm
