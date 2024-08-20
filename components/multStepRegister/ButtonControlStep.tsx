import React from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "../ui/button"

interface ButtonControlStepProps {
  isLastStep: boolean
  nextStep: () => void
  disabled: boolean
}

export const ButtonControlStep = ({
  isLastStep,
  nextStep,
  disabled,
}: ButtonControlStepProps) => {
  return (
    <>
      <Button
        onClick={nextStep}
        disabled={disabled}
        type="submit"
        className="shadow-rounded-xl relative border border-black/20 bg-neutral-900 align-bottom text-neutral-300 hover:bg-neutral-700 hover:text-white"
      >
        {isLastStep ? "Confirm" : "Próximo passo "}
        {!isLastStep && <ArrowRight className="ml-3" />}
      </Button>
    </>
  )
}
