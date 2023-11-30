import React, { PropsWithChildren, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: React.FC<PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return <>{children}</>
}

export default ScrollToTop
