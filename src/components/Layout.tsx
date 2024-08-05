
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="overflow-y-scroll content-area relative">
      <div className="grid-rows-auto-stretch grid items-start gap-y-4 text-base max-w-screen-md mx-auto px-3 py-6 h-full">
        {children}
        </div>
    </div>
  )
}

export default Layout