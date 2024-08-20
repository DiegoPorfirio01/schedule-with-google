"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"

import { api } from "@/lib/axios"
import { Button } from "@/components/ui/button"
import Calendar from "@/components/Calendar/page"

interface availability {
  possibleTimes: Array<{ hour: number }>
  availableTimes: Array<{ hour: number }>
}

export default function CalendarStep({
  onSelectDateTime,
  user,
}: {
  onSelectDateTime: (date: Date) => void
  user: {
    username: string | null
    id: string | null
    image: string | null
    bio: string | null
    name: string | null
  }
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const week_day = selectedDate ? dayjs(selectedDate).format("dddd") : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format("DD [de] MMMM")
    : null

  const seletedDateFormatted = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null

  const { data } = useQuery<availability>({
    queryKey: ["avaiability", seletedDateFormatted],
    queryFn: async () => {
      const response = await api.get(
        `user-times/${user.username}/availability`,
        {
          params: {
            date: seletedDateFormatted,
          },
        }
      )

      return response.data
    },
    enabled: !!selectedDate,
  })

  const handleSelectTime = (hour) => {
    return () => {
      const dateWithTime = dayjs(selectedDate)
        .set("hour", hour)
        .startOf("hour")
        .toDate()

      onSelectDateTime(dateWithTime)
    }
  }

  return (
    <main className="grid grid-cols-4">
      <div
        className={`${
          selectedDate ? "col-span-3" : "col-span-4"
        } mr-5 mt-4 flex flex-col items-start`}
      >
        <Calendar
          user={user}
          selectedDate={selectedDate}
          onDateSelected={setSelectedDate}
        />
      </div>
      {selectedDate && (
        <div className="max-h-max w-full overflow-auto">
          <div className="mt-4">
            <small className="text-gray-200">
              {week_day}, {describedDate}
            </small>
          </div>
          <div className="mr-2 grid h-auto gap-1 sm:grid-cols-1">
            {data?.possibleTimes.map((hour, index) => (
              <div key={index} className="mr-2">
                <Button
                  onClick={handleSelectTime(hour)}
                  variant={"calendar"}
                  disabled={!data.availableTimes.includes(hour)}
                  className="h-9 w-full rounded-md bg-primary text-primary-foreground"
                >
                  <p>{hour.toString()}:00h</p>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
