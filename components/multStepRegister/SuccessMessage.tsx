import Image from "next/image"
import Link from "next/link"
import successIcon from "@/public/images/multStepRegister/success.png"
import { motion } from "framer-motion"
import { Clipboard, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
}

interface SuccessMessageProps {
  user: {
    id: string | null
    username: string | null
    image: string | null
    bio: string | null
    name: string | null
  }
}

const SuccessMessage = ({ user }: SuccessMessageProps) => {
  return (
    <motion.section
      className="flex h-full w-full flex-col items-center justify-center gap-4 text-center md:gap-2"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        src={successIcon}
        width="150"
        height="150"
        alt="Success Icon"
        className="md:mb-4"
      />
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Obrigado pelo seu cadastro !
      </h4>
      <p className="max-w-md text-sm text-neutral-300 md:text-base">
        Agora você pode acessar seu dashboard e receber a url da sua agenda
      </p>

      <div className="mt-6 flex items-center">
        <div className="after:shadow-highlight relative flex gap-2 after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
          <Link href="/dashboard">
            <Button variant="default">
              <LogIn className="mr-2 h-7" /> Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

export default SuccessMessage
