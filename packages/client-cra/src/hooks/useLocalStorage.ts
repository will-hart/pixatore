// Based on https://usehooks.com/useLocalStorage/

import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  const clearValue = () => {
    window.localStorage.removeItem(key)
    setStoredValue(undefined)
  }

  return { value: storedValue, setValue, clearValue }
}
