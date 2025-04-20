import { AIVoiceInput } from "./ai-voice-input";
import { useState, useRef, useCallback, useEffect } from "react";

interface VoiceControlProps {
  startWatering: () => void;
  stopWatering: () => void;
  onTranscription?: (result: any, recordings: { duration: number; timestamp: Date }[]) => void;
}

export function VoiceControl({
  startWatering,
  stopWatering,
  onTranscription,
}: VoiceControlProps) {
  const [recordings, setRecordings] = useState<
    { duration: number; timestamp: Date }[]
  >([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingTimeRef = useRef<number>(0);

  // Clean up function to stop all media resources
  const cleanupMediaResources = useCallback(() => {
    // Stop the media recorder if it exists and is recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    // Stop all tracks in the media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    // Reset the audio chunks
    audioChunksRef.current = [];
    
    // Ensure recording state is reset
    setIsRecording(false);
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanupMediaResources();
    };
  }, [cleanupMediaResources]);

  const startRecording = async () => {
    console.log("startRecording function called");
    
    // Cleanup any existing recording
    cleanupMediaResources();
    
    try {
      // Request audio with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1, // mono audio
          sampleRate: 16000 // 16kHz sample rate, which works better for speech recognition
        } 
      });
      
      streamRef.current = stream;
      
      // Create MediaRecorder with specified MIME type
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log("Data available event triggered", event.data.size);
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Set up onstop handler before starting
      mediaRecorder.onstop = async () => {
        console.log("MediaRecorder onstop event triggered");
        try {
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { 
              type: 'audio/webm;codecs=opus' 
            });
            console.log("Audio blob created:", audioBlob.size, "bytes");
            await sendAudioToBackend(audioBlob);
          } else {
            console.log("No audio chunks collected");
          }
        } catch (error) {
          console.error("Error processing audio:", error);
        }
        
        // Stop the tracks after processing the audio
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => {
            track.stop();
          });
          streamRef.current = null;
        }
      };

      // Request data in smaller chunks for better streaming
      mediaRecorder.start(100); // Collect 100ms chunks
      setIsRecording(true);
      recordingTimeRef.current = 0;
      console.log("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    console.log("stopRecording function called, isRecording:", isRecording, "mediaRecorder state:", mediaRecorderRef.current?.state);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log("Stopping media recorder");
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      console.log("Cannot stop recording: mediaRecorder =", mediaRecorderRef.current, "state =", mediaRecorderRef.current?.state);
      // Reset UI state if mediaRecorder is not actually recording
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob: Blob) => {
    console.log("sendAudioToBackend called with blob size:", audioBlob.size);
    try {
      // Create FormData and append audio blob
      const formData = new FormData();
      
      // Convert to a more common audio format that Flask can handle better
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('language', 'en');
      formData.append('ignore_timestamps', 'False');

      console.log("Sending audio to backend...", {
        url: 'http://localhost:5000/api/transcribe',
        blobSize: audioBlob.size,
        blobType: audioBlob.type
      });
      
      // Set longer timeout for large files
      const response = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        body: formData,
        // Add timeout for large requests
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      console.log("Response received:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const result = await response.json();
      console.log("Transcription result:", result);
      setTranscription(result);
      
      // Call the onTranscription callback immediately after receiving the transcription
      if (onTranscription) {
        onTranscription(result, recordings);
      }
      
      // Process commands based on transcription
      if (result.text) {
        const text = result.text.toLowerCase();
        if (text.includes('start') || text.includes('water') || text.includes('on')) {
          console.log("Voice command: Start watering");
          startWatering();
        } else if (text.includes('stop') || text.includes('off')) {
          console.log("Voice command: Stop watering");
          stopWatering();
        }
        
        // Always run robot inference for any transcription
        console.log("Running robot inference after transcription");
        try {
          const inferenceResponse = await fetch('http://localhost:3001/api/run-inference', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!inferenceResponse.ok) {
            const errorText = await inferenceResponse.text();
            throw new Error(`HTTP error! Status: ${inferenceResponse.status}, Details: ${errorText}`);
          }
          
          const inferenceResult = await inferenceResponse.json();
          console.log("Robot inference completed:", inferenceResult);
        } catch (error) {
          console.error("Error running robot inference:", error);
        }
      }
    } catch (error) {
      console.error("Error sending audio to backend:", error);
    }
  };

  // Use useCallback to memoize these functions
  const handleStart = useCallback(() => {
    console.log("handleStart called");
    startRecording();
  }, []);

  const handleStop = useCallback((duration: number) => {
    console.log("handleStop called with duration:", duration);
    recordingTimeRef.current = duration;
    stopRecording();
    setRecordings((prev) => [
      ...prev.slice(-4),
      { duration, timestamp: new Date() },
    ]);
  }, []);

  return (
    <div className="voice-control-container">
      <AIVoiceInput
        onStart={handleStart}
        onStop={handleStop}
      />
    </div>
  );
}
