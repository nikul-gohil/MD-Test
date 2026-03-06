'use client'

import { useEffect } from 'react'

// Suppresses hydration warnings caused by browser extensions (e.g. BIS)
// that inject attributes like `bis_skin_checked` into DOM elements.
export default function SuppressHydrationWarnings() {
  useEffect(() => {
    const orig = console.error.bind(console)
    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('bis_skin_checked') || args[0].includes('bis_frame_'))
      ) {
        return
      }
      orig(...args)
    }
    return () => {
      console.error = orig
    }
  }, [])
  return null
}
