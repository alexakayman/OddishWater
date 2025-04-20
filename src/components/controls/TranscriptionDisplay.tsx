import { useState, useEffect } from "react";

interface Recording {
  duration: number;
  timestamp: Date;
}

interface TranscriptionDisplayProps {
  transcription: {
    text: string;
    duration?: number;
  } | null;
  recordings: Recording[];
}

export function TranscriptionDisplay({ 
  transcription, 
  recordings 
}: TranscriptionDisplayProps) {
  if (!transcription) return null;
  
  return (
    <div className="mt-8 border-t pt-6 border-emerald-100 dark:border-slate-700">
      <h2 className="text-base font-semibold text-emerald-800 dark:text-amber-200 mb-4">Voice Recognition Results</h2>
      <div className="p-4 rounded-lg bg-emerald-50/30 dark:bg-slate-800/30 border border-emerald-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-medium text-sm text-emerald-800 dark:text-amber-200 mb-3">Command Transcription:</h3>
        <p className="mb-3 text-sm text-slate-700 dark:text-slate-300 font-medium italic">"{transcription.text}"</p>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Duration: {transcription.duration?.toFixed(2)}s
          </span>
          {recordings.length > 0 && (
            <span className="ml-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Recorded: {recordings[recordings.length - 1].timestamp.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>
      
      {recordings.length > 1 && (
        <div className="mt-4">
          <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Recent Recordings</h3>
          <div className="flex flex-wrap gap-2">
            {recordings.slice().reverse().slice(0, 5).map((rec, idx) => (
              <div key={idx} className="text-xs bg-slate-100 dark:bg-slate-800 rounded px-2 py-1 text-slate-600 dark:text-slate-300">
                {rec.timestamp.toLocaleTimeString()} ({rec.duration}s)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 