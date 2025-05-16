import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Envelope: React.FC = () => {
  const navigate = useNavigate();
  const handleSealClick = () => navigate('/slideshow');

  return (
    <div
      className="relative mx-auto w-full max-w-lg"
      style={{ aspectRatio: '8 / 5' }}
    >
      <div
        className="absolute inset-0 bg-gray-100 shadow-lg"
        style={{
          borderRadius: '8px',
          background: 'linear-gradient(180deg, #eef4fb 0%, #d6e7fa 100%)'
        }}
      />

      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '80%',
          background: 'linear-gradient(180deg, #d6e7fa 0%, #bcdffb 100%)',
          clipPath: 'polygon(0% 0%, 50% 60%, 100% 0%)',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px'
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '80%',
          background: 'linear-gradient(0deg, #d6e7fa 0%, #bcdffb 100%)',
          clipPath: 'polygon(0% 100%, 50% 40%, 100% 100%)',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        }}
      />

      <button
        onClick={handleSealClick}
        className={
          `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
           w-16 h-16 rounded-full
           bg-gradient-to-br from-amber-400 to-amber-600
           ring-2 ring-blue-50
           flex items-center justify-center
           shadow-lg
           hover:scale-110 transition-transform duration-300
           focus:outline-none`
        }
        title="Abrir convite"
      >
        <Heart className="w-6 h-6 text-white" />
      </button>

    </div>
  );
};

export default Envelope;
