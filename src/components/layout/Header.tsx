import React, { useContext } from 'react';
import { Leaf, Moon, Sun } from 'lucide-react';
import { OddishWaterContext } from '../../context/OddishWaterContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useContext(OddishWaterContext);
  
  return (
    <header className={`py-4 px-6 ${isDarkMode ? 'bg-slate-800' : 'bg-emerald-700'} transition-colors duration-500`}>
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Leaf className={`mr-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-200'}`} />
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-amber-200' : 'text-amber-50'}`}>
            OddishWater
          </h1>
        </div>
        
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-700 text-amber-200' : 'bg-emerald-600 text-amber-50'}`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;