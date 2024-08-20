import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const profileBodySchema = z.object({
  bio: z.string().min(10),
  username: z
    .string()
    .min(3)
    .refine((username) => !username.includes(" "), {
      message: "O username não pode conter espaços",
    })
    .refine((username) => /^[A-Za-z0-9-]+$/.test(username), {
      message: "O username só pode conter letras, números e hífens",
    }),
})

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const user = await db.user.findFirst({
      where: {
        email: session.user?.email,
      },
      select: {
        id: true,
      },
    })

    const json = await req.json()
    const { bio, username } = profileBodySchema.parse(json)

    const existsUsername = !!(await db.user.findFirst({
      where: {
        username: username,
        email: {
          not: session.user?.email!,
        },
      },
    }))

    if (existsUsername) {
      return new Response("Usuário já cadastrado", { status: 400 })
    }

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        bio: bio,
        username: username,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    return new Response(error, { status: 500 })
  }
}
