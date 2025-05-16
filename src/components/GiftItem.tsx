import React from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { GiftItem as GiftItemType } from '../types';

interface GiftItemProps {
  gift: GiftItemType;
}

const GiftItem: React.FC<GiftItemProps> = ({ gift }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-blue-800">{gift.name}</h3>
          <p className="text-amber-600 font-medium mt-1">{gift.price}</p>
          <div className="flex items-center mt-2 text-gray-600 text-sm">
            <ShoppingBag className="w-4 h-4 mr-1" />
            <span>{gift.store}</span>
          </div>
        </div>
        <a 
          href={gift.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-4 p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <ExternalLink className="w-5 h-5 text-blue-500" />
        </a>
      </div>
    </div>
  );
};

export default GiftItem;