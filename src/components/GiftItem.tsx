import React, { useState } from 'react';
import { ExternalLink, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiftItem as GiftItemType } from '../types';

interface GiftItemProps {
  gift: GiftItemType;
  onReserve: (giftId: string, guestName: string) => void;
}

const GiftItem: React.FC<GiftItemProps> = ({ gift, onReserve }) => {
  const [isReserving, setIsReserving] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [error, setError] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);

  const handleReserve = async () => {
    if (!guestName.trim()) {
      setError('Por favor, insira seu nome');
      return;
    }

    await onReserve(gift.id, guestName.trim());
    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 3000);
    setIsReserving(false);
    setGuestName('');
    setError('');
  };

  const getCategoryColor = (level: string) => {
    switch (level) {
      case 'diamond': return 'bg-blue-100 text-blue-800';
      case 'gold': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-10 rounded-lg"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`inline-block px-3 py-1 rounded-full text-sm mb-2 ${getCategoryColor(gift.category.level)}`}
              >
                {gift.category.name}
              </motion.div>
              <p className="text-lg font-medium text-gray-800">
                Parabéns! Você é um convidado nível {gift.category.name}!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={gift.image_url}
              alt={gift.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-blue-800">{gift.name}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(gift.category.level)}`}>
                {gift.category.name}
              </span>
            </div>

            <div className="flex items-center mt-2 text-gray-600 text-sm">
              <ShoppingBag className="w-4 h-4 mr-1" />
              <span>{gift.store}</span>
            </div>

            {gift.reserved ? (
              <div className="mt-3 text-sm text-gray-500">
                <p className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-500" />
                  Reservado por {gift.guest_name}
                </p>
              </div>
            ) : isReserving ? (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handleReserve}
                    className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => {
                      setIsReserving(false);
                      setError('');
                    }}
                    className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsReserving(true)}
                className="mt-3 px-4 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-50"
              >
                Reservar presente
              </button>
            )}
          </div>

          <a
            href={gift.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-blue-500" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GiftItem;
