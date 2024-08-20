import next from "next"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { api } from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import FormWrapper from "./FormWrapper"

interface UserInforFormProps {
  user: {
    name: string
    email: string
    image: string
  }
  nextStep: () => void
}

const updateProfileSchema = z.object({
  bio: z.string().min(10, "A bio precisa ter no mínimo 10 caracteres"),
  username: z
    .string()
    .min(3, "O username precisa ter no mínimo 3 caracteres")
    .refine((username) => !username.includes(" "), {
      message: "O username não pode conter espaços",
    })
    .refine((username) => /^[A-Za-z0-9-]+$/.test(username), {
      message: "O username só pode conter letras, números e hífens",
    })
    .transform((value) => value.toLowerCase()),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export const UserInfoForm = ({ user, nextStep }: UserInforFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try {
      const response = await api.put("/users/profile", data)

      if (response.status === 204) {
        nextStep()
      }
    } catch (error) {
      return toast({
        title: "Ops, algo de errado 😞",
        description: error.response.data,
        variant: "destructive",
      })
    }
  }

  return (
    <FormWrapper
      title="Informações do seu Perfil"
      className="h-full"
      description="A foto da sua conta google, aparecerá na sua página pessoal."
    >
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <div className="w-full max-w-sm items-center gap-1.5 text-white">
          <Label htmlFor="image">Foto de Perfil</Label>
          <Image
            className="rounded-full"
            src={user.image}
            alt={user.name}
            objectFit="contain"
            width={80}
            height={80}
          />
        </div>
        <div className="text-white">
          {" "}
          <Label htmlFor="bio">Seu usuário</Label>
          <Input
            type={"text"}
            className="border-white"
            placeholder="seu-usuario"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div className="text-white">
          {" "}
          <Label htmlFor="bio">Sobre você</Label>
          <Textarea
            placeholder="Fale um pouco sobre você, isso será exibido na sua página pessoal"
            {...register("bio")}
          />
          {errors.bio && (
            <span className="text-red-500">{errors.bio.message}</span>
          )}
        </div>

        <Button type="submit" variant={"wired"} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Finalizar"}
        </Button>
      </form>
    </FormWrapper>
  )
}
