"use server"

import { cache } from "react"

import { db } from "./db"

export const getScheduleUserUrl = cache(async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      image: true,
      bio: true,
      name: true,
    },
  })
  return user
})
