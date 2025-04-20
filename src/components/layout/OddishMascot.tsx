import React, { useState, useContext } from "react";
import { OddishWaterContext } from "../../context/OddishWaterContext";

const OddishMascot: React.FC = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { isDarkMode } = useContext(OddishWaterContext);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  // Close tooltip when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".oddish-mascot")) {
      setIsTooltipVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div className="relative oddish-mascot">
        {/* Temporary placeholder button while image loads */}
        <button
          onClick={toggleTooltip}
          className={`
            flex items-center justify-center
            w-16 h-16 rounded-full 
            ${
              isDarkMode
                ? "bg-slate-700 text-amber-200"
                : "bg-emerald-100 text-emerald-800"
            }
            shadow-lg hover:scale-110 transition-all duration-200
            border-2 ${
              isDarkMode ? "border-amber-200/30" : "border-emerald-200"
            }
          `}
        >
          🌱
        </button>

        {/* Original image (commented out for now) */}
        {/* <img
          src="/oddish.png"
          alt="Oddish Mascot"
          className="w-24 h-24 cursor-pointer hover:scale-110 transition-transform duration-200 select-none"
          onClick={toggleTooltip}
          style={{ filter: isDarkMode ? 'brightness(1.2)' : 'none' }}
        /> */}

        {isTooltipVisible && (
          <div
            className={`
              absolute bottom-full right-0 mb-4 p-4 
              rounded-lg shadow-lg w-64
              ${
                isDarkMode
                  ? "bg-slate-800 text-amber-200 border border-amber-200/30"
                  : "bg-white text-emerald-800 border border-emerald-200"
              } 
              transition-colors duration-500
            `}
          >
            <div className="text-sm">
              <p className="font-medium mb-2">
                Hi, I'm your OddishWater companion! 🌱
              </p>
              <p>
                I'm here to help keep your plants happy and hydrated. Check the
                controls above to adjust your watering schedule!
              </p>
            </div>
            <div
              className={`
                absolute -bottom-2 right-6 w-3 h-3 transform rotate-45
                ${
                  isDarkMode
                    ? "bg-slate-800 border-r border-b border-amber-200/30"
                    : "bg-white border-r border-b border-emerald-200"
                }
              `}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OddishMascot;
