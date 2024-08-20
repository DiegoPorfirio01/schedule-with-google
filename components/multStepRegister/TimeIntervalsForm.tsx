import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { api } from "@/lib/axios"
import { convertTimeStringToMinutes } from "@/lib/convert-time-string-to-minutes"
import { getWeekDays } from "@/lib/get-week-days"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

import { Button } from "../ui/button"
import FormWrapper from "./FormWrapper"

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        week_day: z.number().min(0).max(6),
        enabled: z.boolean(),
        initTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Selecione pelo menos um dia e horário disponível.",
    })
    .refine(
      (intervals) =>
        intervals.every(
          (time) =>
            time.initTime.split(":")[1] === "00" &&
            time.endTime.split(":")[1] === "00"
        ),
      {
        message: "Os horários devem ser em intervalos de 1 hora.",
      }
    )
    .transform((intervals) => {
      return intervals.map((interval) => ({
        week_day: interval.week_day,
        initTimeInMinuts: convertTimeStringToMinutes(interval.initTime),
        endTimeInMinuts: convertTimeStringToMinutes(interval.endTime),
      }))
    })
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinuts - 60 >= interval.initTimeInMinuts
        ),
      {
        message:
          "O horário final deve ser pelo menos 1 hora a mais que o horário inicial.",
      }
    ),
})

export const TimeIntervalsForm = ({ nextStep }) => {
  type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
  type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

  async function handleSetTimeIntervals(data: any) {
    const intervals = data as TimeIntervalsFormOutput

    const response = await api.post("/users/time-intervals", intervals)

    if (response.status === 201) {
      nextStep()
    }
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { week_day: 0, enabled: false, initTime: "08:00", endTime: "18:00" },
        { week_day: 1, enabled: true, initTime: "08:00", endTime: "18:00" },
        { week_day: 2, enabled: true, initTime: "08:00", endTime: "18:00" },
        { week_day: 3, enabled: true, initTime: "08:00", endTime: "18:00" },
        { week_day: 4, enabled: true, initTime: "08:00", endTime: "18:00" },
        { week_day: 5, enabled: true, initTime: "08:00", endTime: "18:00" },
        { week_day: 6, enabled: true, initTime: "08:00", endTime: "18:00" },
      ],
    },
  })

  const week_day = getWeekDays()

  const { fields } = useFieldArray({
    control: control,
    name: "intervals",
  })

  const intervals = watch("intervals")

  return (
    <FormWrapper title="Selecione seus dias disponíveis" className="h-full">
      <form
        className="flex h-full flex-col justify-between gap-2"
        onSubmit={handleSubmit(handleSetTimeIntervals)}
      >
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`flex h-10 items-center gap-2 rounded-md border p-2 ${"border-neutral-600"} outline-none hover:border-[#77f6aa] focus:border-[#77f6aa] md:gap-5 md:p-2`}
            >
              <Controller
                control={control}
                name={`intervals.${index}.enabled`}
                render={({ field }) => {
                  return (
                    <Checkbox
                      onCheckedChange={(checked) => field.onChange(checked)}
                      checked={field.value}
                      className={
                        field.value ? "border-[#77f6aa] bg-[#77f6aa]" : ""
                      }
                    />
                  )
                }}
              />
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <label
                    htmlFor="online-service"
                    className="font-semibold text-white"
                  >
                    {week_day[field.week_day.toString()]}
                  </label>
                </div>
                <div className="flex items-center gap-1 text-[#77f6aa]">
                  <Input
                    type="time"
                    disabled={!intervals[index]?.enabled}
                    className={`h-7 w-28 rounded-md border bg-neutral-900 text-white ${
                      intervals[index]?.enabled
                        ? "border-[#77f6aa6e]"
                        : "border-none"
                    } `}
                    step={60}
                    {...register(`intervals.${index}.initTime`)}
                  />
                  <Input
                    type="time"
                    disabled={!intervals[index]?.enabled}
                    className={`h-7 w-28 rounded-md border bg-neutral-900 text-white ${
                      intervals[index]?.enabled
                        ? "border-[#77f6aa6e]"
                        : "border-none"
                    } `}
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </div>
              </div>
            </div>
          ))}
          {errors.intervals && (
            <p className="text-sm text-red-500">{errors.intervals.message}</p>
          )}
        </div>

        <Button variant={"wired"} disabled={isSubmitting}>
          {isSubmitting ? (
            "Enviando..."
          ) : (
            <span className="flex items-center">
              Próximo passo <ArrowRight className="ml-3" />
            </span>
          )}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default TimeIntervalsForm
