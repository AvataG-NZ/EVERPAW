import { useEffect, useState, useRef } from 'react';

interface BackgroundSlideshowProps {
  images: string[];
  interval?: number;
}

let globalShuffledImages: string[] = [];
let globalCurrentIndex = 0;
let globalPreviousIndex = -1;
let globalTimer: NodeJS.Timeout | null = null;

const shuffleArray = (array: string[]): string[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const BackgroundSlideshow = ({
  images,
  interval = 25000
}: BackgroundSlideshowProps) => {
  if (globalShuffledImages.length === 0 || globalShuffledImages.length !== images.length) {
    globalShuffledImages = shuffleArray(images);
    globalCurrentIndex = 0;
    globalPreviousIndex = -1;
  }

  const [currentIndex, setCurrentIndex] = useState(globalCurrentIndex);
  const [previousIndex, setPreviousIndex] = useState(globalPreviousIndex === -1 ? globalShuffledImages.length - 1 : globalPreviousIndex);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (globalTimer) {
      clearTimeout(globalTimer);
    }

    const advanceSlide = () => {
      if (!isMountedRef.current) return;

      const nextIndex = (globalCurrentIndex + 1) % globalShuffledImages.length;

      if (nextIndex === 0) {
        globalShuffledImages = shuffleArray(images);
      }

      globalPreviousIndex = globalCurrentIndex;
      globalCurrentIndex = nextIndex;

      setCurrentIndex(nextIndex);
      setPreviousIndex(globalPreviousIndex);

      globalTimer = setTimeout(advanceSlide, interval);
    };

    globalTimer = setTimeout(advanceSlide, interval);

    return () => {
      isMountedRef.current = false;
    };
  }, [images, interval]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        <img
          src={globalShuffledImages[previousIndex]}
          alt="Background"
          className="w-full h-full object-cover object-right md:object-center"
          style={{
            animation: `slowZoom ${interval}ms ease-in-out forwards`
          }}
        />
      </div>

      <div
        key={currentIndex}
        className="absolute inset-0"
        style={{
          animation: 'fadeIn 4000ms ease-in-out forwards'
        }}
      >
        <img
          src={globalShuffledImages[currentIndex]}
          alt="Background"
          className="w-full h-full object-cover object-right md:object-center"
          style={{
            animation: `slowZoom ${interval}ms ease-in-out forwards`
          }}
        />
      </div>

      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
    </div>
  );
};
