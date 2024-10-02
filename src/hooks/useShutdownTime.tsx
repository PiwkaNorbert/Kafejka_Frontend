import { ShutdownTimeContext } from "../providers/shutdown-time-provider";
import { useContext } from "react";

export const useShutdownTime = () => {
    const context = useContext(ShutdownTimeContext);
    if (context === undefined) {
      throw new Error('useShutdownTime must be used within a ShutdownTimeProvider');
    }
    return context;
  };