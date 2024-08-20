import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <ModeToggle />
          <p className="text-center text-sm leading-loose md:text-left">
            Desenvolvido por{" "}
            <a
              href={"https://wired3.tech"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Wired3 Tech
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={"/privacy-policy"}>
            <span>Política de privacidade</span>
          </Link>
          <Link href={"/terms-of-service"}>
            <span>Termos de serviço</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
