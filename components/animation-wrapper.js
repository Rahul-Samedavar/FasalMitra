"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const AnimationWrapper = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div ref={ref} className={cn("fade-in", isVisible && "visible", className)}>
      {children}
    </div>
  )
}

export default AnimationWrapper
