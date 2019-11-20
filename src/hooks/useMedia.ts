import { useEffect, useState } from 'react'

export default function useMedia(queries: any, values: any, defaultValue: any) {
  const match = () => values[queries.findIndex((q: any) => matchMedia(q).matches)] || defaultValue
  const [value, set] = useState(match)
  useEffect(() => {
    const handler = () => set(match)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return value
}
