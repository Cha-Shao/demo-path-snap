'use client'

import { useEffect } from "react"

const Providers = ({
  children
}: {
  children: React.ReactNode
}) => {
  useEffect(() => {
    const docHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', docHeight)

    return () => window.removeEventListener('resize', docHeight)
  })

  return (<>
    {children}
  </>)
}

export default Providers