import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

const ConfirmPage: React.FC = () => {
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const message = `${weddingData.contact.message}${name}`;
    const whatsappUrl = `https://wa.me/${weddingData.contact.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
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
          <h1 className="text-2xl font-light text-blue-800 mb-1">Confirmar Presença</h1>
          <p className="text-sm text-gray-600">Por favor, confirme sua presença até {weddingData.couple.date}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Seu nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite seu nome completo"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              <span>Confirmar via WhatsApp</span>
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Ao clicar em confirmar, você será redirecionado para o WhatsApp com uma mensagem pré-preenchida.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;