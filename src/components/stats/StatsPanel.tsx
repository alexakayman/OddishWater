import React, { useContext, useEffect, useState } from "react";
import { OddishWaterContext } from "../../context/OddishWaterContext";
import { BarChart3, Droplets, Plane as Plant } from "lucide-react";
import LogEntry, { Log, LogType } from "./LogEntry";

const StatsPanel: React.FC = () => {
  const { logs, isDarkMode, addLog } = useContext(OddishWaterContext);
  const [plantCount, setPlantCount] = useState(0);
  const [nutrientsAmount, setNutrientsAmount] = useState(0);

  useEffect(() => {
    // Initial quick detection
    const initialTimeout = setTimeout(() => {
      if (plantCount < 1) {
        setPlantCount(1);
        addLog({
          type: "plant",
          message: "Plant detected in the environment",
          timestamp: new Date(),
        });
      }
    }, 1000);

    // Start incrementing stats immediately with shorter interval
    const interval = setInterval(() => {
      const newNutrients = Math.random() * 2; // Smaller increments
      setNutrientsAmount((prev) => prev + newNutrients);
      addLog({
        type: "nutrients",
        message: `Added ${newNutrients.toFixed(1)}g of nutrients`,
        timestamp: new Date(),
      });
    }, 2000); // Shorter interval

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [plantCount, addLog]);

  return (
    <div
      className={`rounded-xl border-2 ${
        isDarkMode ? "border-emerald-700" : "border-emerald-300"
      } overflow-hidden transition-colors duration-500`}
    >
      <div
        className={`p-3 ${
          isDarkMode ? "bg-slate-800" : "bg-emerald-100"
        } flex items-center transition-colors duration-500`}
      >
        <BarChart3
          className={`mr-2 ${
            isDarkMode ? "text-amber-200" : "text-emerald-700"
          }`}
          size={20}
        />
        <h2
          className={`font-medium ${
            isDarkMode ? "text-amber-200" : "text-emerald-800"
          }`}
        >
          Statistics & Logs
        </h2>
      </div>

      <div
        className={`${
          isDarkMode ? "bg-slate-900" : "bg-white"
        } p-4 transition-colors duration-500`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-slate-800 text-amber-200"
                : "bg-emerald-50 text-emerald-800"
            } transition-colors duration-500`}
          >
            <div className="flex items-center mb-2">
              <Plant size={20} className="mr-2" />
              <h3 className="font-medium">Plants Detected</h3>
            </div>
            <p className="text-3xl font-bold">{plantCount}</p>
          </div>

          <div
            className={`rounded-lg p-4 ${
              isDarkMode
                ? "bg-slate-800 text-amber-200"
                : "bg-emerald-50 text-emerald-800"
            } transition-colors duration-500`}
          >
            <div className="flex items-center mb-2">
              <Droplets size={20} className="mr-2" />
              <h3 className="font-medium">Nutrients Added</h3>
            </div>
            <p className="text-3xl font-bold">{nutrientsAmount.toFixed(1)} g</p>
          </div>
        </div>

        <div
          className={`rounded-lg p-4 ${
            isDarkMode ? "bg-slate-800" : "bg-emerald-50"
          } transition-colors duration-500`}
        >
          <h3
            className={`font-medium mb-3 ${
              isDarkMode ? "text-amber-200" : "text-emerald-800"
            }`}
          >
            Activity Log
          </h3>

          <div
            className={`max-h-40 overflow-y-auto ${
              isDarkMode ? "scrollbar-dark" : "scrollbar-light"
            }`}
          >
            {logs.length > 0 ? (
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <LogEntry key={index} log={log} />
                ))}
              </div>
            ) : (
              <div
                className={`text-sm italic text-center py-4 ${
                  isDarkMode ? "text-amber-200/50" : "text-emerald-800/50"
                }`}
              >
                No activity logged yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
