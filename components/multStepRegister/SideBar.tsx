import { RoughNotation } from "react-rough-notation"

type NavProps = {
  currentStepIndex: number
  goTo: (index: number) => void
}

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="absolute -top-20 left-0 w-full md:relative md:left-0 md:top-0 md:w-[25%]">
      <nav className="h-full rounded-md border border-neutral-700 bg-neutral-900 py-5 text-slate-200 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-neutral-500 md:flex">
              Etapa 1
            </span>
            <button
              tabIndex={0}
              className={`text-sm ${
                currentStepIndex === 0 ? "text-[#ffe666]" : "text-white"
              } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 0}
                color="#ffe666"
              >
                Conectar agenda
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-neutral-500 md:flex">
              Etapa 2
            </span>
            <button
              tabIndex={0}
              className={`text-sm ${
                currentStepIndex === 1 ? "text-[#77f6aa]" : "text-white"
              } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 1}
                color="#bd284d"
              >
                Disponibilidade
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-neutral-500 md:flex">
              Etapa 3
            </span>
            <button
              tabIndex={0}
              className={`text-sm ${
                currentStepIndex === 2 ? "text-[#6fe79f]" : "text-white"
              } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 2}
                color="#6fe79f"
              >
                Seu perfil
              </RoughNotation>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
