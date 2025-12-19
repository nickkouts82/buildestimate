
import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="phone-frame w-[375px] h-[812px] bg-background-light dark:bg-gray-900 rounded-[3rem] overflow-hidden relative transform scale-[0.75] sm:scale-[0.85] lg:scale-90 xl:scale-100 transition-transform duration-500 origin-center lg:origin-right">
      {/* Notch / Status Bar Area */}
      <div className="absolute top-0 w-full h-12 z-20 flex justify-between items-center px-6 text-text-main-light dark:text-text-main-dark bg-opacity-90 bg-background-light dark:bg-gray-900 backdrop-blur-md">
        <span className="text-xs font-semibold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <span className="material-icons text-[14px]">signal_cellular_alt</span>
          <span className="material-icons text-[14px]">wifi</span>
          <span className="material-icons text-[14px]">battery_full</span>
        </div>
      </div>
      
      {/* Internal Content Area */}
      <div className="w-full h-full relative">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center z-40">
        <div className="w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default PhoneFrame;
