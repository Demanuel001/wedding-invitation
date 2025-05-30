import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import GiftItem from '../components/GiftItem';
import { GiftItem as GiftItemType, GiftCategory } from '../types';
import { supabase } from '../lib/supabase';

const GiftsPage: React.FC = () => {
  const [gifts, setGifts] = useState<GiftItemType[]>([]);
  const [categories, setCategories] = useState<GiftCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Define the correct order of levels
  const levelOrder = ['diamond', 'gold', 'silver', 'bronze'];

  useEffect(() => {
    fetchGiftsAndCategories();
  }, []);

  const fetchGiftsAndCategories = async () => {
    try {
      // Fetch categories first
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('gift_categories')
        .select('*');

      if (categoriesError) throw categoriesError;

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

      if (giftsError) throw giftsError;

      const formattedGifts = giftsData.map(gift => ({
        ...gift,
        reserved: gift.gift_reservations.length > 0,
        guest_name: gift.gift_reservations[0]?.guest_name
      }));

      setGifts(formattedGifts);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      console.error('Error reserving gift:', error);
    }
  };

  const getGiftsByCategory = (categoryId: string) => {
    return gifts.filter(gift => gift.category?.id === categoryId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex items-center justify-center">
        <div className="text-blue-500">Carregando presentes...</div>
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
          <h1 className="text-2xl font-light text-blue-800 mb-1">Lista de Presentes</h1>
          <p className="text-sm text-gray-600">Sua presença é o presente mais especial, mas se desejar nos presentear, aqui estão algumas sugestões</p>
        </div>

        <div className="space-y-8">
          {categories.map((category) => {
            const categoryGifts = getGiftsByCategory(category.id);
            if (categoryGifts.length === 0) return null;

            return (
              <div key={category.id} className="space-y-4">
                <h2 className="text-xl font-light text-blue-800 border-b border-blue-100 pb-2">
                  Presentes {category.name}
                </h2>
                {categoryGifts.map((gift) => (
                  <GiftItem
                    key={gift.id}
                    gift={gift}
                    onReserve={handleReserve}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GiftsPage;
