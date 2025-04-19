import React, { useContext } from 'react';
import { Play, Square, DropletIcon } from 'lucide-react';
import { OddishWaterContext } from '../../context/OddishWaterContext';
import WaterDropAnimation from '../animations/WaterDropAnimation';

const ControlPanel: React.FC = () => {
  const { isRunning, startWatering, stopWatering, isDarkMode } = useContext(OddishWaterContext);
  
  return (
    <div className={`mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-emerald-100'} rounded-xl p-4 border-2 ${isDarkMode ? 'border-emerald-700' : 'border-emerald-300'} relative overflow-hidden transition-colors duration-500`}>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <div className={`text-xl font-medium ${isDarkMode ? 'text-amber-200' : 'text-emerald-800'}`}>
          Water Control
          <div className={`text-sm ${isDarkMode ? 'text-amber-200/70' : 'text-emerald-700/70'}`}>
            {isRunning ? 'Robot is currently watering' : 'Robot is idle'}
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={startWatering}
            disabled={isRunning}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 ${
              isRunning 
                ? `opacity-50 cursor-not-allowed ${isDarkMode ? 'bg-emerald-800 text-emerald-300' : 'bg-emerald-200 text-emerald-700'}` 
                : `${isDarkMode ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`
            }`}
          >
            <Play size={18} />
            Start
          </button>
          
          <button
            onClick={stopWatering}
            disabled={!isRunning}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 ${
              !isRunning 
                ? `opacity-50 cursor-not-allowed ${isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-200 text-red-700'}` 
                : `${isDarkMode ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'}`
            }`}
          >
            <Square size={18} />
            Stop
          </button>
        </div>
      </div>
      
      {isRunning && <WaterDropAnimation />}
    </div>
  );
};

export default ControlPanel;