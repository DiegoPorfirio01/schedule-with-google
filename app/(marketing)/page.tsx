import Image from "next/image"
import Link from "next/link"
import Calendar1 from "@/public/calendar1.svg"
import Calendar2 from "@/public/calendar2.svg"
import Calendar3 from "@/public/calendar3.svg"
import Calendar4 from "@/public/calendar4.svg"
import Calendar5 from "@/public/calendar5.svg"
import Calendar from "@/public/calendar.svg"
import Schedule from "@/public/calendar/schedule.png"
import ScheduleGoogle from "@/public/agenda-google.svg"
import { ArrowRight, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default async function IndexPage() {
  return (
    <>
      <section className="container mt-24 space-y-6 sm:grid sm:grid-cols-2 md:pb-12 md:pt-10 lg:py-32" id="hero">
        <div className="flex h-auto  flex-col gap-4">
          <h1 className="bg-span-bg bg-clip-text font-heading text-5xl text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            iCalendar
          </h1>
          <Image src={ScheduleGoogle} alt="agenda google" priority={true} quality={100} />
          <div className="space-x-4">
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Conectar Calendário <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        <Image src={Schedule} alt="" priority={true} quality={100} />
      </section>
      <section id="sobre" className="bg-card py-24 text-card-foreground">
        <div className="container">
          {/* Section header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold lg:text-5xl">
              A solução completa para agendamentos online profissionais
            </h1>
            <p className="mt-3 text-lg opacity-70">
              compartilhe sua agenda, automatize tarefas e receba pagamentos
              online.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-16">
            {/* Feature 1 */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="rounded-2xl bg-primary/10 p-12">
                <Image
                  src={Calendar}
                  className="block dark:hidden"
                  alt="Feature 1"
                />
                <Image
                  src={Calendar1}
                  className="hidden dark:block"
                  alt="Feature 1"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold">Simplifique sua agenda</h3>
                <p className="mt-2 leading-normal opacity-70">
                  Crie e gerencie sua agenda online, integrada à sua Conta
                  Google
                </p>

                <p className="mt-2 leading-normal opacity-70">
                  Automatize a confirmação de agendamentos e reduza o trabalho
                  manual.
                </p>
                <Button variant="link" size="sm" className="mt-4 px-0">
                  Saber mais &rarr;
                </Button>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border  bg-card p-4 text-card-foreground">
                    <Icons.star className="h-6 w-6 text-3xl text-primary" />
                    <strong className="mt-2 block">Sua página pessoal</strong>
                    <p className="opacity-70">
                      Compartilhe um link personalizado com seus clientes para
                      que agendem horários disponíveis.
                    </p>
                  </div>
                  <div className="rounded-xl border  bg-card p-4 text-card-foreground">
                    <Icons.pointer className="h-6 w-6 text-3xl text-primary" />
                    <strong className="mt-2 block">
                      Redução do trabalho manual
                    </strong>
                    <p className="opacity-70">
                      Automatize a confirmação de agendamentos e reduza o
                      trabalho manual.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="rounded-2xl bg-primary/10 p-12 lg:order-2">
                <Image
                  src={Calendar2}
                  className="block dark:hidden"
                  alt="Feature 2"
                />
                <Image
                  src={Calendar3}
                  className="hidden dark:block"
                  alt="Feature 2"
                />
              </div>

              <div className="lg:order-1">
                <h3 className="text-3xl font-bold">
                  Ofereça aos seus clientes uma experiência impecável
                </h3>
                <p className="mt-2 leading-normal opacity-70">
                  Permita que seus clientes agendem horários diretamente em sua
                  agenda, sem contato direto.
                </p>
                <Button variant="link" size="sm" className="mt-4 px-0">
                  Saber Mais &rarr;
                </Button>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border  bg-card p-4 text-card-foreground">
                    <Icons.send className="h-6 w-6 text-3xl text-primary" />
                    <strong className="mt-2 block">
                      Lembretes de agendamento
                    </strong>
                    <p className="opacity-70">
                      Envie lembretes automáticos de agendamentos para reduzir
                      cancelamentos e no-shows.
                    </p>
                  </div>
                  <div className="rounded-xl border  bg-card p-4 text-card-foreground">
                    <Icons.globe className="h-6 w-6 text-3xl text-primary" />
                    <strong className="mt-2 block">
                      Tudo Online, na palma da sua mão
                    </strong>
                    <p className="opacity-70">
                      Sistema de agendamento online, disponível em qualquer
                      dispositivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="rounded-2xl bg-primary/10 p-12 ">
                <Image
                  src={Calendar4}
                  className="block dark:hidden"
                  alt="Feature 3"
                />
                <Image
                  src={Calendar5}
                  className="hidden dark:block"
                  alt="Feature 3"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  Automatize pagamentos e economize tempo
                </h3>
                <p className="mt-2 leading-normal opacity-70">
                  Receba pagamentos online seguros via Stripe, diretamente em
                  sua agenda.
                </p>
                <Button variant="link" size="sm" className="mt-4 px-0">
                  Saber mais &rarr;
                </Button>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border  bg-card p-4 text-card-foreground">
                    <Icons.calendarHeart className="h-6 w-6 text-3xl text-primary" />
                    <strong className="mt-2 block">
                      Seu serviço e cliente seguros
                    </strong>
                    <p className="opacity-70">
                      Utilizamos integração de pagamentos segura e efetiva
                    </p>
                  </div>
                  <div className="rounded-xl border  bg-card p-4 text-card-foreground">
                    <Icons.billing className="h-6 w-6 text-3xl text-primary" />
                    <strong className="mt-2 block">
                      Diferentes métodos pagamento
                    </strong>
                    <p className="opacity-70">
                      Usamos integração da Stripe para facilitar e assegurar os
                      pagamentos dos seus clientes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="precos" className="container flex flex-col  gap-6 py-8 md:py-12 lg:py-24">
        <div className="flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            FREE
          </h2>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              O que tem no plano Free ?
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Agendamentos liberados
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Compartilhe o link da
                sua agenda
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Acesso básico ao
                dashboard
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">R$0</h4>
              <p className="text-sm font-medium text-muted-foreground">
                p/ Mês
              </p>
            </div>
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Começar
            </Link>
          </div>
        </div>
      </section>
      <section className="container flex flex-col gap-6 py-8 md:py-12 lg:py-24">
        <div className="flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Upgrade para PRO
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Desbloqueia recursos avançados para sua agenda online.
          </p>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              o que o plano PRO oferece ?
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Agendamentos ilimitados
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Pagamentos online
              </li>

              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Customização da landing
                page
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Acesso total ao
                dashboard
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Controle financeiro
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Suporte premium
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">R$19</h4>
              <p className="text-sm font-medium text-muted-foreground">
                p/ Mês
              </p>
            </div>

            <Button variant="link" size="lg" disabled>
              Indisponível
            </Button>
          </div>
        </div>
        <div className="flex w-full max-w-[58rem] flex-col gap-4">
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
            <strong>Qualquer dúvida entre em contato.</strong>
          </p>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Seus compromissos facilitados
          </h2>
        </div>
      </section>
    </>
  )
}
