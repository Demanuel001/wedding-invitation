import React from 'react';
import ActionButtons from '../components/ActionButtons';
import { weddingData } from '../data/weddingData';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 rounded-full bg-amber-100 opacity-20 blur-3xl"></div>

      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Cabeçalho com data */}
        <div className="text-center mb-12">
          <p className="text-blue-400 mb-2 tracking-widest uppercase text-sm">Save the Date</p>
          <p className="text-3xl text-blue-800 font-light">{weddingData.couple.date}</p>
        </div>

        {/* Card principal */}
        <div
          onClick={() => navigate('/slideshow')}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer group"
        >
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Heart className="w-8 h-8 text-blue-500 group-hover:text-serenity transition-colors" />
              </div>
            </div>

            <h1 className="text-4xl font-light text-blue-800 mb-4">
              {weddingData.couple.partner1}
              <span className="text-amber-400 mx-2">&</span>
              {weddingData.couple.partner2}
            </h1>

            <div className="w-16 h-[1px] bg-blue-200 mx-auto mb-4"></div>

            <div className="space-y-2 mb-8">
              <p className="text-gray-600">{weddingData.couple.time}</p>
              <p className="text-gray-800 font-medium">{weddingData.couple.location.name}</p>
              <p className="text-gray-600 text-sm">{weddingData.couple.location.address}</p>
            </div>

            <p className="text-sm text-blue-400 group-hover:text-blue-500 transition-colors">
              Clique para ver nosso convite especial
            </p>
          </div>
        </div>

        <ActionButtons coupleInfo={weddingData.couple} />
      </div>
    </div>
  );
};

export default HomePage;
