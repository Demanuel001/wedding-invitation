import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Check, Heart, CheckCircle2,
  Shirt, Users, Sparkles, PartyPopper, HeartHandshake, Gift
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { weddingData } from '../data/weddingData';

const ConfirmPage: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [hasPartner, setHasPartner] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenNames, setChildrenNames] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setError('Digite seu nome completo.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('rsvp_confirmations').insert([{
        guest_name: guestName.trim(),
        partner_name: hasPartner ? partnerName.trim() : null,
        children_names: hasChildren ? childrenNames.trim() : null
      }]);

      if (insertError) throw insertError;

      setSuccess(true);
      setGuestName('');
      setPartnerName('');
      setChildrenNames('');
      setHasPartner(false);
      setHasChildren(false);
    } catch (err) {
      console.error(err);
      setError('Erro ao confirmar presença. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const rules = [
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      text: "Confirme sua presença com antecedência",
    },
    {
      icon: <Shirt className="w-5 h-5" />,
      text: "Não use branco, é reservado para a noiva",
    },
    {
      icon: <Shirt className="w-5 h-5" />,
      text: "Traje: esporte fino, capriche no visual",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Evite levar acompanhantes não convidados",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Não leve a decoração para casa"
    },
    {
      icon: <PartyPopper className="w-5 h-5" />,
      text: "Curta muito, a festa também é para você!",
    },
    {
      icon: <HeartHandshake className="w-5 h-5" />,
      text: "Não saiam sem se despedir dos noivos"
    },
    {
      icon: <Gift className="w-5 h-5" />,
      text: "Confira nossa lista de presentes online",
    }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-medium text-blue-800 mb-2">Presença Confirmada!</h2>
          <p className="text-gray-600">Estamos muito felizes por você estar conosco nesse momento tão especial!</p>
          <Link to="/" className="inline-block mt-6 text-blue-600 hover:underline">
            <ArrowLeft className="inline w-4 h-4 mr-1" />
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

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
          <p className="text-sm text-gray-600">Por favor, confirme até {weddingData.dateConfirm}</p>
        </div>

        {/* Regrinhas */}
        <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-light text-blue-800 mb-4 text-center">Regrinhas do Casamento</h2>
          <div className="space-y-3">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-center gap-3 bg-white bg-opacity-60 rounded p-3">
                <div className="text-amber-500">{rule.icon}</div>
                <span className="text-blue-800">{rule.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">
                Seu nome
              </label>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div className="mb-4 flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasPartner"
                checked={hasPartner}
                onChange={() => setHasPartner(!hasPartner)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasPartner" className="text-sm text-gray-700">Levará acompanhante?</label>
            </div>

            {hasPartner && (
              <div className="mb-4">
                <label htmlFor="partnerName" className="block text-sm text-gray-700 mb-1">
                  Nome do acompanhante
                </label>
                <input
                  type="text"
                  id="partnerName"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Digite o nome do acompanhante"
                />
              </div>
            )}

            <div className="mb-4 flex items-center space-x-2">
              <input
                type="checkbox"
                id="hasChildren"
                checked={hasChildren}
                onChange={() => setHasChildren(!hasChildren)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasChildren" className="text-sm text-gray-700">Levará criança(s)?</label>
            </div>

            {hasChildren && (
              <div className="mb-4">
                <label htmlFor="childrenNames" className="block text-sm text-gray-700 mb-1">
                  Nome(s) da(s) criança(s)
                </label>
                <input
                  type="text"
                  id="childrenNames"
                  value={childrenNames}
                  onChange={(e) => setChildrenNames(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Ana, Pedro"
                />
              </div>
            )}

            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Presença'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
