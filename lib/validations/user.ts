import * as z from "zod"

export const userNameSchema = z.object({
  name: z.string(),
})

export const calendarUserSchema = z.object({
  username: z.string(),
  date: z.string(),
})
