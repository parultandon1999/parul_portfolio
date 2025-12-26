"use client"

import * as React from "react"
import { useSettings } from "@/context/SettingsContext"
import { useTheme } from "@/hooks/useTheme"

export function ScrollProgressIndicator() {
  const { settingsData } = useSettings()
  const { theme } = useTheme()
  const [value, setValue] = React.useState(0)

  // Don't render if disabled or settings not loaded
  if (!settingsData?.theme?.scrollBarEnabled) {
    return null
  }

  // Get the appropriate color based on theme
  const scrollBarColor = theme === 'dark' ? settingsData.theme.scrollBarDark : settingsData.theme.scrollBarLight

  // Safety check for color
  if (!scrollBarColor) {
    return null
  }

  React.useEffect(() => {
    let animationFrameId: number

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const progress = (scrollPosition / documentHeight) * 100
        setValue(progress)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 w-full z-50"
      style={{
        background: `linear-gradient(90deg, ${scrollBarColor}, ${scrollBarColor}80)`,
        width: `${value}%`,
        transition: 'width 0.1s ease-out',
      }}
    />
  )
}
