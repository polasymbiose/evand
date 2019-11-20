import { useEffect, useState } from 'react'

export const useRest = (init: boolean) => {
  const [rest, setrest] = useState(init)

  useEffect(() => {
    setrest(!rest)
  }, [rest])

  return [rest, setrest]
}