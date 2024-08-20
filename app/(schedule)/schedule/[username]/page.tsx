import React, { Suspense } from "react"
import Image from "next/image"

import { getScheduleUserUrl } from "@/lib/get-schedule-user-url"

import ScheduleForm from "../../../../components/Calendar/ScheduleForm/page"

interface ScheduleProps {
  params: {
    username: string
  }
}

export async function generateStaticParams() {
  return []
}

export default async function Schedule({
  params: { username },
}: ScheduleProps) {
  const user = await getScheduleUserUrl(username)

  return (
    <>
      {user && (
        <section className="flex-col space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <div className="container flex flex-col gap-4 text-center sm:items-center">
            <Suspense fallback={<div>Loading...</div>}>
              <div className="mb-24 flex flex-col items-center">
                <Image
                  src={user.image!}
                  width={100}
                  height={100}
                  priority={true}
                  className="mb-2 rounded-full"
                  alt={user.name!}
                />
                <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
                  {user.name}
                </span>
                <p className="mt-2 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                  {user.bio}
                </p>
              </div>
            </Suspense>
            <ScheduleForm user={user} />
          </div>
        </section>
      )}

      {!user && (
        <section className="flex-col space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex flex-col items-center gap-4 text-center">
            <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
              Usuário não existe, verifique se você usou a URL correta.
            </span>
          </div>
        </section>
      )}
    </>
  )
}

export const dynamicParams = true
export const revalidate = 3600
