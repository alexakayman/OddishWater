import { AIVoiceInput } from "./ai-voice-input";
import { useState } from "react";

interface VoiceControlProps {
  startWatering: () => void;
  stopWatering: () => void;
}

export function VoiceControl({
  startWatering,
  stopWatering,
}: VoiceControlProps) {
  const [recordings, setRecordings] = useState<
    { duration: number; timestamp: Date }[]
  >([]);

  const handleStop = (duration: number) => {
    setRecordings((prev) => [
      ...prev.slice(-4),
      { duration, timestamp: new Date() },
    ]);
    stopWatering();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <AIVoiceInput
          onStart={() => {
            console.log("Recording started");
            startWatering();
          }}
          onStop={handleStop}
        />
      </div>
    </div>
  );
}
