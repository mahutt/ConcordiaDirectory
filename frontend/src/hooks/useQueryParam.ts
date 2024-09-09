import { useState, useEffect } from 'react'

const useQueryParam = (
  paramName: string,
  defaultValue: string = ''
): [string, (value: string) => void] => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get(paramName) || defaultValue
    }
    return defaultValue
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (value) urlParams.set(paramName, value)
      else urlParams.delete(paramName)
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${urlParams}`
      )
    }
  }, [value, paramName])

  return [value, setValue]
}

export default useQueryParam
