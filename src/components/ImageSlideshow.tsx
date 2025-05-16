import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  verses: string[];
  autoPlayInterval?: number;
}

const ImageSlideshow: React.FC<Props> = ({
  images,
  verses,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    Promise.all(images.map(src =>
      new Promise<boolean>(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      })
    )).then(statuses => setImagesLoaded(statuses));
  }, [images]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex(i => (i + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [images.length, autoPlayInterval]);

  if (imagesLoaded.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-white">Carregando imagens...</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`
            absolute inset-0 transition-opacity duration-1000
            ${idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          <div
            className="absolute inset-0 bg-center bg-cover transition-transform duration-10000"
            style={{
              backgroundImage: `url(${src})`,
              transform: idx === currentIndex ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
            <div className="bg-black bg-opacity-30 p-6 rounded-lg max-w-md backdrop-blur-sm z-10">
              <p className="text-white font-light italic text-lg md:text-xl mb-2">
                "{verses[idx % verses.length]}"
              </p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => setCurrentIndex(i => i === 0 ? images.length - 1 : i - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-30 text-white hover:bg-opacity-50 transition-all focus:outline-none z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setCurrentIndex(i => (i + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-30 text-white hover:bg-opacity-50 transition-all focus:outline-none z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ImageSlideshow;
