import { useState, useEffect } from 'react'

export default (handler: () => any, interval: number, dep: any[] = []) => {
  const [intervalId, setIntervalId] = useState()
  useEffect(() => {
    const id = setInterval(handler, interval)
    setIntervalId(id)
    return () => clearInterval(id)
  }, [...dep])
  return () => clearInterval(intervalId)
}
