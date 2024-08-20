import { User } from "lucide-react"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

import { db } from "./db"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  const userId = session?.user.id

  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      username: true,
    },
  })

  return data
}
