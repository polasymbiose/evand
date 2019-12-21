import { useEffect, useState, useRef } from 'react'

const useIsMounted = () => {
  // const [isMounted, setIsMounted] = useState(false)
  const isMounted = useRef(false)
  useEffect(() => {
    // setIsMounted(true)
    isMounted.current = true
    return () => {
      // setIsMounted(false)
      isMounted.current = false
    }
  }, [])

  return isMounted.current
}

export default useIsMounted
