import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import GiftItem from '../components/GiftItem';
import { weddingData } from '../data/weddingData';

const GiftsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-lg mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Voltar</span>
        </Link>
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-[1px] bg-blue-200"></div>
            <Heart className="w-6 h-6 text-blue-400 mx-2" />
            <div className="w-8 h-[1px] bg-blue-200"></div>
          </div>
          <h1 className="text-2xl font-light text-blue-800 mb-1">Lista de Presentes</h1>
          <p className="text-sm text-gray-600">Sua presença é o presente mais especial, mas se desejar nos presentear, aqui estão algumas sugestões</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weddingData.gifts.map((gift, index) => (
            <GiftItem key={index} gift={gift} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftsPage;