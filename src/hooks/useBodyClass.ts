import { useEffect, useState, useRef } from 'react'

const useBodyClass = (className: string, mod = true) => {
    useEffect(() => {
    mod ? document.body.classList.add(className) : document.body.classList.remove(className)
    return () => {
      document.body.classList.remove(className)
    }
  }, [mod])
}

export default useBodyClass
