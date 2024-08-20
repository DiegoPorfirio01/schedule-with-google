import axios from "axios"
import dayjs from "dayjs"
import { google } from "googleapis"
import { z } from "zod"

import { appClientConfig } from "@/config/clients"
import { db } from "@/lib/db"
import { getGoogleOAuthToken } from "@/lib/google"

const createSchedullingBodySchema = z.object({
  access_token: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(),
})

const routeContextSchema = z.object({
  params: z.object({
    username: z.string(),
  }),
})

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const user = await db.user.findFirst({
      where: {
        username: params.username,
      },
    })

    if (!user) {
      return new Response(null, { status: 404 })
    }

    const json = await req.json()

    const data = createSchedullingBodySchema.parse(json)

    const schedulingDate = dayjs(data.date).startOf("hour")

    if (schedulingDate.isBefore(new Date())) {
      return new Response("o dia do agendamneto já passou", { status: 422 })
    }

    const conflictingScheduling = await db.scheduling.findFirst({
      where: {
        userId: user.id,
        date: schedulingDate.toDate(),
      },
    })

    if (conflictingScheduling) {
      return new Response("já existe um agendamento para este dia e hora", {
        status: 422,
      })
    }

    const client = appClientConfig.clients.find(
      (item) => item.username === params.username
    )

    const email = data.email
    let name = "nome não informado"

    if (data.name) {
      name = data.name
    }

    if (client) {
      const api_url = client?.url_api

      try {
        const response = await axios.get(`${api_url}`, {
          params: {
            access_key: data.access_token,
            email: data.email,
          },
        })

        const resposta = response.data
        name = resposta.name
      } catch (error) {
        return new Response(error.response.data, {
          status: 422,
        })
      }

      try {
        await axios.post(`${api_url}`, {
          params: {
            access_key: data.access_token,
            email: data.email,
          },
        })
      } catch (error) {
        return new Response(error.response.data, {
          status: 401,
        })
      }
    }

    try {
      const scheduling = await db.scheduling.create({
        data: {
          name: name,
          email: email,
          observations: data.observations,
          date: schedulingDate.toDate(),
          userId: user.id,
        },
      })

      const calendar = google.calendar({
        version: "v3",
        auth: await getGoogleOAuthToken(user.id),
      })

      await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        requestBody: {
          summary: `${name}`,
          description: data.observations,
          start: {
            dateTime: schedulingDate.format(),
          },
          end: {
            dateTime: schedulingDate.add(1, "hour").format(),
          },
          attendees: [{ email, displayName: name }],
          conferenceData: {
            createRequest: {
              requestId: scheduling.id,
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
        },
      })
    } catch (error) {
      return new Response(error.response.data, { status: 500 })
    }

    return new Response("Agendamento ", { status: 201 })
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return new Response(JSON.stringify(error.issues), { status: 422 })
    // }

    return new Response(error.response.data, { status: 500 })
  }
}
