// from various, e.g. https://gist.github.com/jamesfulford/de7b5e5f37d97595e0626cca6f2002e0

import { useEffect, useCallback, useRef } from 'react'

// React hook for delaying calls with time
// returns callback to use for cancelling

export const useInterval = (
  callback: () => void, // function to call. No args passed.
  // if you create a new callback each render, then previous callback will be cancelled on render.
  interval: number = 0, // delay, ms (default: immediately put into JS Event Queue)
  executeImmediately = false,
): (() => void) => {
  const intervalIdRef = useRef<NodeJS.Timeout>()

  const cancel = useCallback(() => {
    const intervalId = intervalIdRef.current
    if (intervalId) {
      intervalIdRef.current = undefined
      clearInterval(intervalId)
    }
  }, [intervalIdRef])

  useEffect(() => {
    if (callback && executeImmediately) callback()
  }, [callback, executeImmediately])

  useEffect(() => {
    //@ts-ignore
    intervalIdRef.current = setInterval(callback, interval)
    return cancel
  }, [callback, interval, cancel])

  return cancel
}
