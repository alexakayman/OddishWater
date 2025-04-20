import { AIVoiceInput } from "./ai-voice-input";
import { useState } from "react";

export function VoiceControl() {
  const [recordings, setRecordings] = useState<
    { duration: number; timestamp: Date }[]
  >([]);

  const handleStop = (duration: number) => {
    setRecordings((prev) => [
      ...prev.slice(-4),
      { duration, timestamp: new Date() },
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <AIVoiceInput
          onStart={() => console.log("Recording started")}
          onStop={handleStop}
          className="text-white"
        />
        {/* {recordings.length > 0 && (
          <div className="text-sm text-white">
            <h3 className="font-medium mb-2">Recent Recordings:</h3>
            <ul className="space-y-1">
              {recordings.map((rec, i) => (
                <li key={i}>
                  {rec.timestamp.toLocaleTimeString()} - {rec.duration}s
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}
