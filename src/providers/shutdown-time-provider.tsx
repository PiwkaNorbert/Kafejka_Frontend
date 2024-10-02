import React, { createContext, useState, ReactNode } from 'react'

type ShutdownTimeContextType = {
  shutdownTime: string
  setShutdownTime: (time: string) => void
}

export const ShutdownTimeContext = createContext<
  ShutdownTimeContextType | undefined
>(undefined)

export const ShutdownTimeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shutdownTime, setShutdownTime] = useState('0')

  return (
    <ShutdownTimeContext.Provider value={{ shutdownTime, setShutdownTime }}>
      {children}
    </ShutdownTimeContext.Provider>
  )
}
