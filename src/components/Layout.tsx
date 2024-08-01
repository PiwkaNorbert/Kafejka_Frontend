
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className=" overflow-y-scroll h-[calc(100dvh-87px)] max-h-[calc(100dvh-87px)] relative">

      <div className="grid grid-rows-[auto_1fr] items-start gap-y-4 text-base max-w-screen-md mx-auto px-3 py-6 h-full">{children}</div>
    </div>
  )
}

export default Layout