// adapted from https://usehooks.com/useAnimation/

import { useEffect, useState, useRef } from 'react'

export const useAnimationTimer = (paused: boolean) => {
  const [elapsed, setElapsed] = useState(0)

  let animationFrame = useRef<number | undefined>(undefined)
  let start = useRef(0)

  useEffect(
    () => {
      if (paused) {
        if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
        animationFrame.current = undefined
        return
      }

      // Function to be executed on each animation frame
      function onFrame() {
        setElapsed(Date.now() - start.current)
        loop()
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame.current = requestAnimationFrame(onFrame)
      }

      function onStart() {
        // Start the loop
        start.current = Date.now()
        loop()
      }

      // start the animation immediately
      onStart()

      // Clean things up
      return () => {
        if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
      }
    },
    [paused], // Only re-run effect if duration or delay changes
  )

  return elapsed
}
