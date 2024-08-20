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
    const year = queryParams.get("year")
    const month = queryParams.get("month")

    if (!year || !month) {
      return new Response("Year and month are required", { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { username: params.username },
    })

    if (!user) {
      return new Response("User not found", { status: 400 })
    }

    const availableWeekDays = await db.userTimeInterval.findMany({
      select: {
        week_day: true,
      },
      where: {
        userId: user.id,
      },
    })

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((week_day) => {
      return !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === week_day
      )
    })

    try {
      const blockedDatesRaw: Array<{ date: number }> = await db.$queryRaw`
      SELECT
        EXTRACT(DAY FROM S.DATE) AS date,
        COUNT(S.date),
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

      FROM schedulings S

      LEFT JOIN user_time_intervals UTI
        ON UTI.week_day = EXTRACT(DOW FROM S.date + INTERVAL '1 day')

      WHERE S.user_id = ${user.id}
        AND EXTRACT(YEAR FROM S.date) = ${year}::int
        AND EXTRACT(MONTH FROM S.date) = ${month}::int

      GROUP BY EXTRACT(DAY FROM S.DATE),
        ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

      HAVING
        COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60);
    `

      const blockedDates = blockedDatesRaw.map((blockedDates) => {
        return blockedDates.date
      })

      return new Response(JSON.stringify({ blockedWeekDays, blockedDates }), {
        status: 200,
      })
    } catch (error) {
      console.log(error)
      return new Response(error, { status: 500 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
