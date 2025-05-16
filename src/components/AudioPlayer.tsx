import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.error('Falha ao tocar áudio:', err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

      <button
        onClick={togglePlayback}
        className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
        title={isPlaying ? 'Parar música' : 'Tocar música'}
      >
        {isPlaying
          ? <Volume2 className="w-5 h-5 text-blue-500" />
          : <VolumeX className="w-5 h-5 text-blue-500" />
        }
      </button>
    </div>
  );
};

export default AudioPlayer;
