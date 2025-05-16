import React from 'react';
import { Map, Gift, Check } from 'lucide-react';
import { CoupleInfo } from '../types';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  coupleInfo: CoupleInfo;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ coupleInfo }) => {
  const openMaps = () => {
    window.open(coupleInfo.location.googleMapsUrl, '_blank');
  };
  
  return (
    <div className="flex flex-row justify-center gap-4 mt-8 max-w-lg mx-auto">
      <button 
        onClick={openMaps}
        className="flex flex-col items-center justify-center gap-2 p-4 bg-white shadow-md rounded-full w-20 h-20 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
      >
        <Map className="w-6 h-6 text-blue-500" />
        <span className="text-xs text-blue-800 font-medium">Local</span>
      </button>
      
      <Link 
        to="/gifts"
        className="flex flex-col items-center justify-center gap-2 p-4 bg-white shadow-md rounded-full w-20 h-20 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
      >
        <Gift className="w-6 h-6 text-blue-500" />
        <span className="text-xs text-blue-800 font-medium">Presentes</span>
      </Link>
      
      <Link 
        to="/confirm"
        className="flex flex-col items-center justify-center gap-2 p-4 bg-white shadow-md rounded-full w-20 h-20 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
      >
        <Check className="w-6 h-6 text-blue-500" />
        <span className="text-xs text-blue-800 font-medium">Confirmar</span>
      </Link>
    </div>
  );
};

export default ActionButtons;