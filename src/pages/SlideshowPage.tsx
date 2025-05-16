import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ImageSlideshow from '../components/ImageSlideshow';
import AudioPlayer from '../components/AudioPlayer';
import { weddingData } from '../data/weddingData';

const SlideshowPage: React.FC = () => {
  useEffect(() => {
    document.title = `${weddingData.couple.partner1} & ${weddingData.couple.partner2} - Convite Especial`;
    return () => {
      document.title = 'Convite de Casamento';
    };
  }, []);

  return (
    <div className="relative h-screen">
      <ImageSlideshow images={weddingData.images} verses={weddingData.verses} />

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent z-10">
        <div className="text-center text-white">
          <h2 className="text-2xl font-light mb-1">
            {weddingData.couple.partner1} & {weddingData.couple.partner2}
          </h2>
          <p className="text-lg">
            {weddingData.couple.date} • {weddingData.couple.time}
          </p>
        </div>
      </div>

      <Link
        to="/"
        className="absolute top-4 left-4 p-2 rounded-full bg-white bg-opacity-30 text-white hover:bg-opacity-50 transition-all focus:outline-none z-10"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <AudioPlayer
        src="/audio/music.mp3"
        autoPlay
      />
    </div>
  );
};

export default SlideshowPage;
