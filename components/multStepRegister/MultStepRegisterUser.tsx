"use client"

import React from "react"
import { AnimatePresence } from "framer-motion"

import { CalendarForm } from "./CalendarForm"
import SideBar from "./SideBar"
import SuccessMessage from "./SuccessMessage"
import { TimeIntervalsForm } from "./TimeIntervalsForm"
import { UserInfoForm } from "./UserInfoForm"
import { useMultiplestepForm } from "./hooks/useMultiplestepForm"

export const MultStepRegisterUser = ({ user }) => {
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(3)

  const isLogged = user?.name ? true : false

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div
          className={`flex justify-between ${
            currentStepIndex === 1 ? "h-[500px] md:h-[500px]" : "h-[500px]"
          } relative m-1 w-11/12 max-w-4xl rounded-lg border border-neutral-700 bg-[#262626] p-4`}
        >
          {!showSuccessMsg ? (
            <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
          ) : (
            ""
          )}
          <main
            className={`${
              showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"
            }`}
          >
            {showSuccessMsg ? (
              <AnimatePresence mode="wait">
                <SuccessMessage user={user} />
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                {currentStepIndex === 0 && (
                  <CalendarForm
                    key="step1"
                    isLogged={isLogged}
                    nextStep={nextStep}
                  />
                )}
                {currentStepIndex === 1 && (
                  <TimeIntervalsForm key="step2" nextStep={nextStep} />
                )}
                {currentStepIndex === 2 && (
                  <UserInfoForm key="step3" nextStep={nextStep} user={user} />
                )}
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
