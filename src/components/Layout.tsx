import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="content-area relative overflow-y-scroll">
      <div className="grid-rows-auto-stretch mx-auto grid h-full max-w-screen-md items-start gap-y-4 px-3 py-6 text-base">
        {children}
      </div>
    </div>
  )
}

export default Layout
