"use client"

import { useState } from "react"

export function useCopyClipboard(url: string) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch (error) {
      console.error("Error copying link:", error)
    } finally {
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return { handleCopy, copied }
}
