import React, { createContext, useState, type ReactNode } from 'react'

type ShutdownTimes = {
  [computerId: number]: string
}

type ShutdownTimeContextType = {
  shutdownTimes: ShutdownTimes
  setShutdownTime: (computerId: number, time: string) => void
}

export const ShutdownTimeContext = createContext<
  ShutdownTimeContextType | undefined
>(undefined)

export const ShutdownTimeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shutdownTimes, setShutdownTimes] = useState<ShutdownTimes>({})

  const setShutdownTime = (computerId: number, time: string) => {
    setShutdownTimes((prev) => ({
      ...prev,
      [computerId]: time,
    }))
  }

  return (
    <ShutdownTimeContext.Provider value={{ shutdownTimes, setShutdownTime }}>
      {children}
    </ShutdownTimeContext.Provider>
  )
}
