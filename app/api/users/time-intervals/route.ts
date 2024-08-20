import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      week_day: z.number().min(0).max(6),
      initTimeInMinuts: z.number(),
      endTimeInMinuts: z.number(),
    })
  ),
})

export async function POST(req: Request) {
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
    await db.userTimeInterval.deleteMany({
      where: {
        userId: user?.id,
      },
    })

    const json = await req.json()
    const { intervals } = timeIntervalsBodySchema.parse(json)

    const intervalData = intervals.map((interval) => ({
      week_day: interval.week_day,
      time_start_in_minutes: interval.initTimeInMinuts,
      time_end_in_minutes: interval.endTimeInMinuts,
      userId: user?.id || "",
    }))

    await db.userTimeInterval.createMany({
      data: intervalData,
      skipDuplicates: false,
    })

    return new Response(null, { status: 201 })
  } catch (error) {
    return new Response(error, { status: 500 })
  }
}
