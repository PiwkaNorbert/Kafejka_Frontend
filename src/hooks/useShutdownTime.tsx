import { ShutdownTimeContext } from "../providers/shutdown-time-provider";
import { useContext } from "react";

export const useShutdownTime = (computerId: number) => {
    const context = useContext(ShutdownTimeContext);
    if (context === undefined) {
      throw new Error('useShutdownTime must be used within a ShutdownTimeProvider');

    }
    return {
      shutdownTime: context.shutdownTimes[computerId] || '0',
      setShutdownTime: (time: string) => context.setShutdownTime(computerId, time)
    };
};