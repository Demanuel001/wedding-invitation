import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, AlertCircle, Diamond, Crown, Award, Medal, Copy, Check, Plane } from 'lucide-react';
import GiftItem from '../components/GiftItem';
import { GiftItem as GiftItemType, GiftCategory } from '../types';
import { supabase } from '../lib/supabase';
import { weddingData } from '../data/weddingData';

const GiftsPage: React.FC = () => {
  const [gifts, setGifts] = useState<GiftItemType[]>([]);
  const [categories, setCategories] = useState<GiftCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pixCopied, setPixCopied] = useState(false);

  const pixKey = weddingData.pixKey;

  const levelOrder = ['diamond', 'gold', 'silver', 'bronze'];

  const categoryStyles = {
    diamond: {
      icon: Diamond,
      gradient: 'from-blue-400 via-purple-500 to-pink-500',
      textGradient: 'from-blue-600 via-purple-600 to-pink-600',
      bgGradient: 'from-blue-50 via-purple-50 to-pink-50',
      borderColor: 'border-blue-200'
    },
    gold: {
      icon: Crown,
      gradient: 'from-yellow-400 via-amber-500 to-orange-500',
      textGradient: 'from-yellow-600 via-amber-600 to-orange-600',
      bgGradient: 'from-yellow-50 via-amber-50 to-orange-50',
      borderColor: 'border-amber-200'
    },
    silver: {
      icon: Award,
      gradient: 'from-gray-400 via-slate-500 to-zinc-500',
      textGradient: 'from-gray-600 via-slate-600 to-zinc-600',
      bgGradient: 'from-gray-50 via-slate-50 to-zinc-50',
      borderColor: 'border-gray-200'
    },
    bronze: {
      icon: Medal,
      gradient: 'from-amber-600 via-orange-600 to-red-600',
      textGradient: 'from-amber-700 via-orange-700 to-red-700',
      bgGradient: 'from-amber-50 via-orange-50 to-red-50',
      borderColor: 'border-amber-300'
    }
  };

  useEffect(() => {
    fetchGiftsAndCategories();
  }, []);

  const fetchGiftsAndCategories = async () => {
    try {
      setError(null);

      // Fetch categories first
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('gift_categories')
        .select('*');

      if (categoriesError) {
        throw new Error('Erro ao carregar categorias: ' + categoriesError.message);
      }

      // Sort categories according to the desired order
      const sortedCategories = categoriesData.sort((a, b) =>
        levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
      );

      setCategories(sortedCategories);

      // Then fetch gifts with their categories
      const { data: giftsData, error: giftsError } = await supabase
        .from('gifts')
        .select(`
          *,
          category:gift_categories(*),
          gift_reservations(guest_name)
        `);

      if (giftsError) {
        throw new Error('Erro ao carregar presentes: ' + giftsError.message);
      }

      if (!giftsData) {
        throw new Error('Nenhum presente encontrado');
      }

      const formattedGifts = giftsData.map(gift => ({
        ...gift,
        reserved: gift.gift_reservations.length > 0,
        guest_name: gift.gift_reservations[0]?.guest_name
      }));

      setGifts(formattedGifts);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError(error instanceof Error ? error.message : 'Erro ao carregar a lista de presentes');
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (giftId: string, guestName: string) => {
    try {
      const { error } = await supabase
        .from('gift_reservations')
        .insert([{ gift_id: giftId, guest_name: guestName }]);

      if (error) throw error;

      // Refresh gifts list
      await fetchGiftsAndCategories();
    } catch (error) {
      console.error('Erro ao reservar presente:', error);
      alert('Não foi possível reservar o presente. Por favor, tente novamente.');
    }
  };

  const getGiftsByCategory = (categoryId: string) => {
    return gifts.filter(gift => gift.category?.id === categoryId);
  };

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar PIX:', error);
      alert('Não foi possível copiar a chave PIX. Tente novamente.');
    }
  };

  const renderCategoryHeader = (category: GiftCategory) => {
    const style = categoryStyles[category.level as keyof typeof categoryStyles];
    const IconComponent = style.icon;

    return (
      <div className={`relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r ${style.bgGradient} border ${style.borderColor} shadow-sm`}>
        <div className="flex items-center justify-center gap-3">
          <div className={`p-3 rounded-full bg-gradient-to-r ${style.gradient} shadow-lg`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h2 className={`text-2xl font-bold bg-gradient-to-r ${style.textGradient} bg-clip-text text-transparent`}>
              Presentes Nível {category.name}
            </h2>
            {category.level === 'bronze' && (
              <p className="text-sm text-gray-600 mt-1 font-medium">
                ⚠️ Limite de 1 presente por pessoa
              </p>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${style.gradient} opacity-10 rounded-full -translate-y-16 translate-x-16`}></div>
        <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${style.gradient} opacity-10 rounded-full translate-y-12 -translate-x-12`}></div>
      </div>
    );
  };

  const renderPixSection = () => {
    return (
      <div className="relative overflow-hidden rounded-xl p-6 mb-8 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 border border-sky-200 shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 shadow-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Operação Lua de Mel
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Contribua, se desejar, para memórias que levaremos para sempre. ✈️
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-4">
            <p className="text-gray-600 text-sm mb-4">
              Memórias especiais são feitas com pessoas especiais. Obrigado por caminhar com a gente nessa nova etapa. ✨
            </p>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Chave PIX</p>
              <div className="flex items-center justify-between bg-white rounded-md p-3 border">
                <span className="font-mono text-sm text-gray-800 flex-1 mr-2 break-all">
                  {pixKey}
                </span>
                <button
                  onClick={copyPixKey}
                  className="flex items-center gap-1 px-3 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors text-sm font-medium"
                >
                  {pixCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              💙 Sua contribuição será um presente muito especial para nós!
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-400 via-blue-400 to-cyan-400 opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-400 via-blue-400 to-cyan-400 opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex items-center justify-center">
        <div className="text-blue-500">Carregando presentes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-800 mb-2">Ops! Algo deu errado</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              fetchGiftsAndCategories();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <Link
        to="/"
        className="fixed top-4 left-4 p-2 rounded-full bg-white bg-opacity-30 text-blue-600 hover:bg-opacity-50 transition-all focus:outline-none shadow-md z-50"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="max-w-lg mx-auto pt-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-[1px] bg-blue-200"></div>
            <Heart className="w-6 h-6 text-blue-400 mx-2" />
            <div className="w-8 h-[1px] bg-blue-200"></div>
          </div>
          <h1 className="text-2xl font-light text-blue-800 mb-1">Lista de Presentes</h1>
          <p className="text-sm text-gray-600">Sua presença é o presente mais especial, mas se desejar nos presentear, aqui estão algumas sugestões</p>
        </div>

        <div className="space-y-8">
          {categories.map((category) => {
            const categoryGifts = getGiftsByCategory(category.id);
            if (categoryGifts.length === 0) return null;

            return (
              <div key={category.id} className="space-y-4">
                {renderCategoryHeader(category)}
                <div className="space-y-4">
                  {categoryGifts.map((gift) => (
                    <GiftItem
                      key={gift.id}
                      gift={gift}
                      onReserve={handleReserve}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          {renderPixSection()}
        </div>
      </div>
    </div>
  );
};

export default GiftsPage;
