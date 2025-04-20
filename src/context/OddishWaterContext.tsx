import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Log, LogType } from "../components/stats/LogEntry";

interface OddishWaterContextType {
  isRunning: boolean;
  isDarkMode: boolean;
  logs: Log[];
  startWatering: () => void;
  stopWatering: () => void;
  toggleDarkMode: () => void;
}

export const OddishWaterContext = createContext<OddishWaterContextType>({
  isRunning: false,
  isDarkMode: false,
  logs: [],
  startWatering: () => {},
  stopWatering: () => {},
  toggleDarkMode: () => {},
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

  // Add activity logs while robot is running
  useEffect(() => {
    if (!isRunning) return;

    const logTypes: LogType[] = ["plant", "water", "warning", "success"];
    const messages = [
      "Plant detected: Pothos",
      "Plant detected: Snake Plant",
      "Plant detected: Monstera",
      "Plant detected: Succulent",
      "Watering plant for 5 seconds",
      "Watering plant for 3 seconds",
      "Soil moisture: 30%, watering needed",
      "Soil moisture: 70%, skipping watering",
      "Warning: Low water level in reservoir",
      "Warning: Plant not in expected position",
      "Success: Watering cycle completed",
      "Success: Plant appears healthier",
    ];

    const interval = setInterval(() => {
      const randomType = logTypes[Math.floor(Math.random() * logTypes.length)];
      let message = "";

      switch (randomType) {
        case "plant":
          message = messages[Math.floor(Math.random() * 4)];
          break;
        case "water":
          message = messages[4 + Math.floor(Math.random() * 4)];
          break;
        case "warning":
          message = messages[8 + Math.floor(Math.random() * 2)];
          break;
        case "success":
          message = messages[10 + Math.floor(Math.random() * 2)];
          break;
      }

      addLog(randomType, message);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const addLog = (type: LogType, message: string) => {
    const newLog: Log = {
      type,
      message,
      timestamp: new Date(),
    };

    setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 20)); // Keep only most recent 20 logs
  };

  const startWatering = () => {
    setIsRunning(true);
    addLog("success", "Robot started watering process");
  };

  const stopWatering = () => {
    setIsRunning(false);
    addLog("warning", "Robot stopped watering process");
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
      }}
    >
      {children}
    </OddishWaterContext.Provider>
  );
};
