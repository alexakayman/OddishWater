import React from 'react';

const WaterDropAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <div 
          key={i}
          className="absolute animate-fall opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 3}s`
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-blue-400"
          >
            <path 
              d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" 
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default WaterDropAnimation;