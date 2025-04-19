import React, { useContext } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { OddishWaterContext } from '../../context/OddishWaterContext';

const VideoFeed: React.FC = () => {
  const { isRunning, isDarkMode } = useContext(OddishWaterContext);
  
  // In a real application, this would connect to the robot's camera stream
  
  return (
    <div className={`mb-6 rounded-xl border-2 ${isDarkMode ? 'border-emerald-700' : 'border-emerald-300'} overflow-hidden relative transition-colors duration-500`}>
      <div className={`p-3 ${isDarkMode ? 'bg-slate-800' : 'bg-emerald-100'} flex items-center transition-colors duration-500`}>
        <Camera className={`mr-2 ${isDarkMode ? 'text-amber-200' : 'text-emerald-700'}`} size={20} />
        <h2 className={`font-medium ${isDarkMode ? 'text-amber-200' : 'text-emerald-800'}`}>
          Live Robot View
        </h2>
      </div>
      
      <div className={`bg-gray-900 aspect-video flex flex-col items-center justify-center text-center ${isRunning ? 'animate-pulse' : ''}`}>
        {isRunning ? (
          <>
            <div className="text-amber-300 mb-2">
              <Camera size={48} />
            </div>
            <p className="text-amber-200 font-medium">Connecting to robot camera...</p>
            <p className="text-amber-200/70 text-sm max-w-md px-4 mt-2">
              When connected, you will see a live view from your watering robot here.
            </p>
          </>
        ) : (
          <>
            <div className="text-gray-500 mb-2">
              <AlertCircle size={48} />
            </div>
            <p className="text-gray-400 font-medium">Camera feed not active</p>
            <p className="text-gray-500 text-sm max-w-md px-4 mt-2">
              Press the Start button to activate the watering robot and view the live camera feed.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;