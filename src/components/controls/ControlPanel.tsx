import React, { useContext, useState } from "react";
import { OddishWaterContext } from "../../context/OddishWaterContext";
import WaterDropAnimation from "../animations/WaterDropAnimation";
import { VoiceControl } from "./VoiceControl";
import { TranscriptionDisplay } from "./TranscriptionDisplay";

interface Recording {
  duration: number;
  timestamp: Date;
}

const ControlPanel: React.FC = () => {
  const { isRunning, startWatering, stopWatering, isDarkMode } =
    useContext(OddishWaterContext);
  const [transcription, setTranscription] = useState<any>(null);
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const handleTranscription = (result: any, currentRecordings: Recording[]) => {
    setTranscription(result);
    setRecordings(currentRecordings);
  };

  return (
    <>
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
            Robot Arm Control
            <div
              className={`text-sm ${
                isDarkMode ? "text-amber-200/70" : "text-emerald-700/70"
              }`}
            >
              {isRunning ? "Robot is currently watering" : "Robot is waiting for instruction"}
            </div>
          </div>

          <div className="flex gap-4">
            <VoiceControl
              startWatering={startWatering}
              stopWatering={stopWatering}
              onTranscription={handleTranscription}
            />
          </div>
        </div>

        {isRunning && <WaterDropAnimation />}
      </div>
      
      {/* Transcription display in a separate section */}
      <TranscriptionDisplay 
        transcription={transcription} 
        recordings={recordings} 
      />
    </>
  );
};

export default ControlPanel;
