import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Heart, CheckCircle2, Shirt, Users, Sparkles, PartyPopper, HeartHandshake } from 'lucide-react';
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

  const rules = [
    { icon: <CheckCircle2 className="w-5 h-5" />, text: "Confirme sua presença" },
    { icon: <Shirt className="w-5 h-5" />, text: "Branco é a cor da noiva" },
    { icon: <Users className="w-5 h-5" />, text: "Convidado não convida" },
    { icon: <Sparkles className="w-5 h-5" />, text: "Não leve a decoração para casa" },
    { icon: <PartyPopper className="w-5 h-5" />, text: "Aproveite bastante a festa" },
    { icon: <HeartHandshake className="w-5 h-5" />, text: "Não saiam sem se despedir dos noivos" }
  ];

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
          <p className="text-sm text-gray-600">Por favor, confirme sua presença até {weddingData.dateConfirm}</p>
        </div>

        {/* Wedding Rules */}
        <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-light text-blue-800 mb-5 text-center">Regrinhas do Casamento</h2>
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white bg-opacity-50 rounded-lg transition-all duration-300 hover:bg-opacity-70"
              >
                <div className="text-amber-500">
                  {rule.icon}
                </div>
                <p className="text-blue-800">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Form */}
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
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
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
