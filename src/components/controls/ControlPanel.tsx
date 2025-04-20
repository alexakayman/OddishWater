import React, { useContext } from "react";
import { OddishWaterContext } from "../../context/OddishWaterContext";
import WaterDropAnimation from "../animations/WaterDropAnimation";
import { VoiceControl } from "./VoiceControl";

const ControlPanel: React.FC = () => {
  const { isRunning, startWatering, stopWatering, isDarkMode } =
    useContext(OddishWaterContext);

  return (
    <div
      className={`mb-6 ${
        isDarkMode ? "bg-slate-800" : "bg-emerald-100"
      } rounded-xl p-4 border-2 ${
        isDarkMode ? "border-emerald-700" : "border-emerald-300"
      } relative overflow-hidden transition-colors duration-500`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <div
          className={`text-xl font-medium ${
            isDarkMode ? "text-amber-200" : "text-emerald-800"
          }`}
        >
          Water Control
          <div
            className={`text-sm ${
              isDarkMode ? "text-amber-200/70" : "text-emerald-700/70"
            }`}
          >
            {isRunning ? "Robot is currently watering" : "Robot is idle"}
          </div>
        </div>

        <div className="flex gap-4">
          <VoiceControl
            startWatering={startWatering}
            stopWatering={stopWatering}
          />
        </div>
      </div>

      {isRunning && <WaterDropAnimation />}
    </div>
  );
};

export default ControlPanel;
