"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function RQProvider({ children }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
