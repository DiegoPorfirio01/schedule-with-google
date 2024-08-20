"use client"

import "@/lib/dayjs"
import { Suspense, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { api } from "@/lib/axios"
import { getWeekDays } from "@/lib/get-week-days"

import { Button } from "../ui/button"

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = Array<CalendarWeek>

interface BlockedDates {
  blockedDates?: number[]
  blockedWeekDays?: number[]
}

interface CalendarProps {
  user: {
    username: string | null
    id: string | null
    image: string | null
    bio: string | null
    name: string | null
  }
  selectedDate?: Date | null
  onDateSelected?: (date: Date) => void
}

export function Calendar({
  selectedDate,
  onDateSelected,
  user,
}: CalendarProps) {
  console.log(user)
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1)
  })

  const handlePreviusMonth = () => {
    const previusMonth = currentDate.subtract(1, "month")
    setCurrentDate(previusMonth)
  }

  const handleNextMonth = () => {
    const nextMonth = currentDate.add(1, "month")
    setCurrentDate(nextMonth)
  }

  const currentMonth = currentDate
    .format("MMMM")
    .slice(0, 1)
    .toUpperCase()
    .concat(currentDate.format("MMMM").slice(1))

  const currentYear = currentDate.format("YYYY")

  const { data: blockedDates } = useQuery<BlockedDates>({
    queryKey: [
      "blocked-dates",
      currentDate.get("year"),
      currentDate.get("month"),
    ],
    queryFn: async () => {
      const response = await api.get(
        `user-times/${user.username}/blocked-dates`,
        {
          params: {
            year: currentDate.get("year"),
            month: currentDate.get("month") + 1,
          },
        }
      )

      return response.data
    },
  })

  console.log(blockedDates)

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) return []

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set("date", index + 1)
    })

    const firstWeekDay = currentDate.startOf("month").day()

    const previusMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, "day")
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth()
    )

    const lastWeekDay = lastDayInCurrentMonth.day()

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay - 1), //dias da semana - ultimo dia do mes
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, "day")
    })

    const calendarDays = [
      ...previusMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf("day").isBefore(dayjs(), "day") ||
            blockedDates?.blockedWeekDays?.includes(date.get("day")) ||
            blockedDates?.blockedDates?.includes(date.get("date")),
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, index, original) => {
        const isNewWeek = index % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: weeks.length + 1,
            days: original.slice(index, index + 7).map((day) => ({
              date: day.date,
              disabled: day.disabled || false,
            })),
          })
        }

        return weeks
      },
      []
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <>
      <div className="mb-3 flex w-full justify-between">
        <span className="text-gray-200">
          {currentMonth}, {currentYear}
        </span>
        <div className="flex gap-2 text-gray-200">
          <button title="Previous month">
            <ChevronLeft
              onClick={handlePreviusMonth}
              xlinkTitle="Previus Month"
              className="h-5 w-5"
            />
          </button>
          <button title="Next month">
            <ChevronRight
              xlinkTitle="Next Month"
              onClick={handleNextMonth}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>

      <table className="font-default w-full table-fixed border-collapse border-spacing-0">
        <thead>
          <tr>
            {getWeekDays({ short: true }).map((week_day) => (
              <th key={week_day} className="text-sm font-medium text-gray-200">
                {week_day}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="lg:h-16">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td
                      key={date.toString()}
                      className="text-sm font-medium text-muted-foreground"
                    >
                      <Button
                        variant={"calendar"}
                        onClick={() => onDateSelected?.(date.toDate())}
                        disabled={disabled}
                        className="aspect-auto w-full align-middle lg:h-16"
                      >
                        {date.get("date")}
                      </Button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
export default Calendar
