import React, { useContext, useEffect, useState } from "react";
import { OddishWaterContext } from "../../context/OddishWaterContext";
import {
  Plane as Plant,
  Droplets,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export type LogType = "plant" | "nutrients" | "warning" | "success";

export interface Log {
  type: LogType;
  message: string;
  timestamp: Date;
}

interface LogEntryProps {
  log: Log;
}

const LogEntry: React.FC<LogEntryProps> = ({ log }) => {
  const { isDarkMode } = useContext(OddishWaterContext);

  const getIcon = () => {
    switch (log.type) {
      case "plant":
        return <Plant size={16} />;
      case "nutrients":
        return <Droplets size={16} />;
      case "warning":
        return <AlertTriangle size={16} />;
      case "success":
        return <CheckCircle2 size={16} />;
      default:
        return null;
    }
  };

  const getColors = () => {
    const baseClasses = `flex items-start p-2 rounded-md text-sm ${
      isDarkMode ? "" : ""
    }`;

    switch (log.type) {
      case "plant":
        return `${baseClasses} ${
          isDarkMode
            ? "bg-emerald-900/30 text-emerald-300"
            : "bg-emerald-100 text-emerald-800"
        }`;
      case "nutrients":
        return `${baseClasses} ${
          isDarkMode
            ? "bg-blue-900/30 text-blue-300"
            : "bg-blue-100 text-blue-800"
        }`;
      case "warning":
        return `${baseClasses} ${
          isDarkMode
            ? "bg-amber-900/30 text-amber-300"
            : "bg-amber-100 text-amber-800"
        }`;
      case "success":
        return `${baseClasses} ${
          isDarkMode
            ? "bg-green-900/30 text-green-300"
            : "bg-green-100 text-green-800"
        }`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={getColors()}>
      <div className="mr-2 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <p>{log.message}</p>
        <p className="text-xs opacity-70 mt-1">
          {log.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default LogEntry;
