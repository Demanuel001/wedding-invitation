import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  verses: string[];
  autoPlayInterval?: number;
  videoSrc?: string;
}

const ImageSlideshow: React.FC<Props> = ({
  images,
  verses,
  autoPlayInterval = 5000,
  videoSrc = "/assets/videos/video.webm",
}) => {
  const totalSlides = images.length + 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pré-carregar imagens
  useEffect(() => {
    Promise.all(images.map(src =>
      new Promise<boolean>(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      })
    )).then(setImagesLoaded);
  }, [images]);

  // Troca automática entre slides (exceto no vídeo)
  useEffect(() => {
    if (currentIndex === images.length) return; // não seta intervalo se for o vídeo

    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(i => (i + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(intervalRef.current!);
  }, [currentIndex, autoPlayInterval, totalSlides, images.length]);

  // Controlar reprodução do vídeo
  useEffect(() => {
    if (currentIndex === images.length && videoRef.current) {
      const video = videoRef.current;
      video.play().catch(() => {});

      const handleEnded = () => {
        setCurrentIndex(0); // Reinicia o slideshow após o vídeo
      };

      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex, images.length]);

  const goToPrevious = () => {
    clearInterval(intervalRef.current!);
    setCurrentIndex(i => (i === 0 ? totalSlides - 1 : i - 1));
  };

  const goToNext = () => {
    clearInterval(intervalRef.current!);
    setCurrentIndex(i => (i + 1) % totalSlides);
  };

  if (imagesLoaded.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="text-white">Carregando imagens...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden z-0">
      {images.map((src, idx) => (
        <div
          key={`img-${idx}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-10000"
            style={{
              backgroundImage: `url(${src})`,
              transform: idx === currentIndex ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        </div>
      ))}

      {/* Slide do vídeo */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          currentIndex === images.length ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover z-0"
          muted
          playsInline
          controls={false}
        />
      </div>

      {/* Papel e versículo */}
      <div className="absolute bottom-0 w-full z-20 pointer-events-none">
        <div className="relative w-full h-[250px] overflow-hidden">
          <img
            src="/assets/paper.png"
            alt="Efeito papel rasgado"
            className="absolute bottom-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(0) invert(1) sepia(0.3) saturate(0) opacity(0.7)',
            }}
          />
          <div className="absolute bottom-6 w-full p-4 text-center bg-opacity-90 min-h-[100px] flex items-start justify-center">
            <p className="text-gray-800 italic font-serif font-bold text-base md:text-lg w-full">
              "{verses[currentIndex % verses.length]}"
            </p>
          </div>
        </div>
      </div>

      {/* Botões */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-10 text-white hover:bg-opacity-50 transition-all focus:outline-none z-30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-10 text-white hover:bg-opacity-50 transition-all focus:outline-none z-30"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ImageSlideshow;
