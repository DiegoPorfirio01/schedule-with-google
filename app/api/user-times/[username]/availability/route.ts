import dayjs from "dayjs"
import { z } from "zod"

import { db } from "@/lib/db"

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      week_day: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  ),
})

const routeContextSchema = z.object({
  params: z.object({
    username: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const queryParams = new URL(req.url).searchParams
    const dateQueryParam = queryParams.get("date")

    const user = await db.user.findUnique({
      where: { username: params.username },
    })

    if (!user) {
      return new Response("User not found", { status: 400 })
    }

    const referenceDate = dayjs(dateQueryParam || new Date())

    const isPastDate = referenceDate.endOf("day").isBefore(new Date())

    if (isPastDate) {
      return new Response(
        JSON.stringify({ possibleTimes: [], availableTimes: [] }),
        {
          status: 200,
        }
      )
    }

    console.log(referenceDate.day())

    const userAvaiability = await db.userTimeInterval.findFirst({
      where: {
        userId: user.id,
        week_day: referenceDate.day(),
      },
    })

    if (!userAvaiability) {
      return new Response(
        JSON.stringify({ possibleTimes: [], availableTimes: [] }),
        {
          status: 200,
        }
      )
    }

    const { time_start_in_minutes, time_end_in_minutes } = userAvaiability

    const startHour = time_start_in_minutes / 60
    const endHour = time_end_in_minutes / 60

    const possibleTimes = Array.from({ length: endHour - startHour }).map(
      (_, i) => {
        return startHour + i
      }
    )

    const blockedTimes = await db.scheduling.findMany({
      select: {
        date: true,
      },
      where: {
        userId: user.id,
        date: {
          gte: referenceDate.set("hour", startHour).toDate(),
          lte: referenceDate.set("hour", endHour).toDate(),
        },
      },
    })

    const availableTimes = possibleTimes.filter((hour) => {
      const isTimeBlocked = blockedTimes.some(
        (blockedTime) => blockedTime.date.getHours() === hour
      )

      const isTimeInPast = referenceDate.set("hour", hour).isBefore(new Date())

      return !isTimeBlocked && !isTimeInPast
    })

    return new Response(JSON.stringify({ possibleTimes, availableTimes }), {
      status: 200,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
