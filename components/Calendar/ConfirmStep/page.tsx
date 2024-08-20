import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { ArrowLeft, Calendar, CheckCircle, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { appClientConfig } from "@/config/clients"
import { api } from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface ConfirmStepProps {
  schedulingDate?: Date | null
  setStep: (step: number) => void
  setSuccessMessage: (succesMessage: boolean) => void
  user: {
    username: string | null
    id: string | null
    image: string | null
    bio: string | null
    name: string | null
  }
}

const ConfirmStep = ({
  schedulingDate,
  setStep,
  user,
  setSuccessMessage,
}: ConfirmStepProps) => {
  const existsInClientList = appClientConfig.clients.some(
    (client) => client.username === user?.username
  )

  const baseSchema = z.object({
    email: z.string().email("Email inválido"),
    observations: z.string().min(10, "Mínimo 10 caracteres"),
    access_token: z.string(),
    name: z.string(),
  })

  const confirmSchedulingSchema = existsInClientList
    ? baseSchema.omit({ name: true })
    : baseSchema.omit({ access_token: true })

  type UpdateProfileData = z.infer<typeof confirmSchedulingSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(confirmSchedulingSchema),
  })

  const handleConfirmScheduling = async (data) => {
    try {
      const response = await api.post(`user-times/${user.username}/schedule`, {
        access_token: data.access_token,
        email: data.email,
        observations: data.observations,
        date: schedulingDate,
      })

      setSuccessMessage(true)
    } catch (error) {
      console.log(error)
      return toast({
        title: "Ops, algo de errado 😞",
        description: error.response.data,
        variant: "destructive",
      })
    }

    setStep(0)
  }

  const describedDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ] YYYY")
  const describedTime = dayjs(schedulingDate).format("HH:mm")

  return (
    <main className="flex w-full">
      <form
        className="flex w-full flex-col justify-between text-start sm:h-[400px] sm:justify-normal"
        onSubmit={handleSubmit(handleConfirmScheduling)}
      >
        <div className="flex justify-start text-white">
          <Calendar className="mr-2" />
          <span>{describedDate}</span>
          <Clock className="ml-5 mr-2" />
          <span>{describedTime}h</span>
        </div>
        <Separator className="my-1 bg-foreground" />
        <div className="mt-1 flex flex-col gap-2 text-white">
          {existsInClientList ? (
            <div className="flex gap-1">
              <div className="flex w-full flex-col gap-1">
                <Label htmlFor="email">Seu email</Label>
                <Input
                  type="text"
                  className="border-secondary-foreground"
                  placeholder="seu email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <Label htmlFor="name">Senha</Label>
                <Input
                  className="border-secondary-foreground"
                  type="password"
                  placeholder="senha"
                  {...register("access_token")}
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-1">
              <div className="flex w-full flex-col gap-1">
                <Label htmlFor="email">Seu email</Label>
                <Input
                  type="text"
                  className="border-secondary-foreground"
                  placeholder="seu email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  className="border-secondary-foreground"
                  type="text"
                  placeholder="nome completo"
                  {...register("name")}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-1 grow flex-col gap-1 text-white">
          {" "}
          <Label htmlFor="bio">Observações</Label>
          <Textarea
            className="border-secondary-foreground sm:h-[140px]"
            placeholder="Fale sobre o que deseja com este agendamento."
            {...register("observations")}
          />
          {errors.observations && (
            <span className="text-red-500">{errors.observations.message}</span>
          )}
        </div>
        <div className="mt-2 flex justify-between">
          <Button type="button" variant={"default"} onClick={() => setStep(0)}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>
          <Button type="submit" variant={"wired"} disabled={isSubmitting}>
            {isSubmitting ? "Confirmando..." : "Finalizar"}
            <CheckCircle className="ml-2" />
          </Button>
        </div>
      </form>
    </main>
  )
}

export default ConfirmStep
