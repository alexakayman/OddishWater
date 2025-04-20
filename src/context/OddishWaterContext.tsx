import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Log, LogType } from "../components/stats/LogEntry";

interface OddishWaterContextType {
  isRunning: boolean;
  isDarkMode: boolean;
  logs: Log[];
  startWatering: () => void;
  stopWatering: () => void;
  toggleDarkMode: () => void;
  addLog: (log: Log) => void;
}

export const OddishWaterContext = createContext<OddishWaterContextType>({
  isRunning: false,
  isDarkMode: false,
  logs: [],
  startWatering: () => {},
  stopWatering: () => {},
  toggleDarkMode: () => {},
  addLog: () => {},
});

interface OddishWaterProviderProps {
  children: ReactNode;
}

export const OddishWaterProvider: React.FC<OddishWaterProviderProps> = ({
  children,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = (log: Log) => {
    setLogs((prevLogs) => [log, ...prevLogs].slice(0, 20)); // Keep only most recent 20 logs
  };

  // Add activity logs immediately on page load
  useEffect(() => {
    const logTypes: LogType[] = ["plant", "nutrients", "warning", "success"];
    const messages = [
      "System initialized and ready",
      "Monitoring plant environment",
      "Checking soil conditions",
      "Analyzing nutrient levels",
      "System operating normally",
      "Plant health assessment in progress",
      "Environmental sensors active",
      "Nutrient delivery system ready",
      "Plant detection system active",
      "System status: Optimal",
    ];

    // Add initial system status log
    addLog({
      type: "success",
      message: "OddishWater system initialized and ready",
      timestamp: new Date(),
    });

    const interval = setInterval(() => {
      const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];

      addLog({
        type: randomType,
        message,
        timestamp: new Date(),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startWatering = () => {
    setIsRunning(true);
    addLog({
      type: "success",
      message: "Robot started nutrient delivery process",
      timestamp: new Date(),
    });
  };

  const stopWatering = () => {
    setIsRunning(false);
    addLog({
      type: "warning",
      message: "Robot stopped nutrient delivery process",
      timestamp: new Date(),
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <OddishWaterContext.Provider
      value={{
        isRunning,
        isDarkMode,
        logs,
        startWatering,
        stopWatering,
        toggleDarkMode,
        addLog,
      }}
    >
      {children}
    </OddishWaterContext.Provider>
  );
};
