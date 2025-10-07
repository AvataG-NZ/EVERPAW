import { useEffect, useState, useRef, memo } from 'react';
import { useLocation } from 'react-router-dom';

interface FeatureBackgroundMap {
  [key: string]: string;
}

export const featureBackgrounds: FeatureBackgroundMap = {
  'health': '/Features copy copy.jpg',
  'safety': '/saftey.jpg.jpeg',
  'avatar': '/AVATAR.jpg copy copy copy.jpg',
  'training': '/Pennywolf-Pooch-and-Pineapple-March-2024-10-edit_WEB-gigapixel-rehkdefine-realistghkjic-1x-faceai v2-gigapixel-redefine-realistic-2x copy.jpg',
  'ai-voice': '/AIVOICE.jpg copy copy.jpg'
};

export let currentFeatureSection: string = 'health';

export const setFeatureSection = (section: string) => {
  currentFeatureSection = section;
  window.dispatchEvent(new CustomEvent('featureSectionChange', { detail: section }));
};

interface BackgroundConfig {
  [key: string]: string | string[];
}

const backgroundConfig: BackgroundConfig = {
  '/': [
    '/BG_1 copy copy copy copy copy copy copy copy copy copy copy copy.jpg',
    '/BG_4.jpg',
    '/BG_5 copy.jpg',
    '/BG_6 copy copy.jpg',
    '/BG_7 copy copy copy copy.jpg',
    '/BG_8 copy.jpg',
    '/BG_9 copy copy.jpg',
    '/BG_10 copy copy.jpg'
  ],
  '/features': '/Features copy copy.jpg',
  '/about': '/About copy.jpg',
  '/shop': '/SHOP copy copy.jpg',
  '/contact': '/Contact copy.jpg',
  '/pricing': '/BG_3.jpg',
  '/beta': '/BG_4 copy copy.jpg',
  '/privacy': '/BG_5 copy copy copy copy.jpg',
  '/terms': '/BG_6 copy copy.jpg',
  '/cookies': '/BG_7 copy copy.jpg',
  '/careers': '/BG_8 copy.jpg',
  '/press': '/BG_9 copy copy copy copy.jpg',
  '/help': '/BG_10 copy copy.jpg',
  '/shipping': '/BG_2 copy copy copy.jpg',
  '/returns': '/BG_4.jpg',
  '/warranty': '/BG_5 copy.jpg'
};

const getRandomNextIndex = (currentIdx: number, arrayLength: number): number => {
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * arrayLength);
  } while (nextIdx === currentIdx);
  return nextIdx;
};

export const UnifiedBackground = memo(() => {
  const location = useLocation();
  const images = backgroundConfig['/'] as string[];
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * images.length));
  const [nextIndex, setNextIndex] = useState(() => getRandomNextIndex(Math.floor(Math.random() * images.length), images.length));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [featureSection, setFeatureSectionState] = useState<string>('health');
  const [currentBg, setCurrentBg] = useState<string>('');
  const [nextBg, setNextBg] = useState<string>('');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleFeatureSectionChange = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      setFeatureSectionState(customEvent.detail);
    };

    window.addEventListener('featureSectionChange', handleFeatureSectionChange);

    return () => {
      window.removeEventListener('featureSectionChange', handleFeatureSectionChange);
    };
  }, []);

  useEffect(() => {
    let newBg = '';

    if (isHomePage) {
      const images = backgroundConfig['/'] as string[];
      newBg = images[currentIndex];
    } else {
      let config = backgroundConfig[location.pathname] || backgroundConfig['/'];

      if (location.pathname === '/features' && featureBackgrounds[featureSection]) {
        config = featureBackgrounds[featureSection];
      }

      if (typeof config === 'string') {
        newBg = config;
      } else {
        newBg = config[0];
      }
    }

    if (newBg !== currentBg && currentBg !== '') {
      setNextBg(newBg);
      setIsPageTransitioning(true);

      setTimeout(() => {
        setCurrentBg(newBg);
        setIsPageTransitioning(false);
      }, 500);
    } else if (currentBg === '') {
      setCurrentBg(newBg);
    }
  }, [location.pathname, featureSection, isHomePage, currentIndex]);

  useEffect(() => {
    if (isHomePage) {
      const images = backgroundConfig['/'] as string[];
      const nextImg = new Image();
      nextImg.src = images[nextIndex];

      const preloadNext = (images.length > nextIndex + 1) ? nextIndex + 1 : 0;
      const preloadImg = new Image();
      preloadImg.src = images[preloadNext];
    }
  }, [nextIndex, isHomePage]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isHomePage) {
      timerRef.current = setInterval(() => {
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentIndex(nextIndex);
          const newNextIndex = getRandomNextIndex(nextIndex, images.length);
          setNextIndex(newNextIndex);
          setIsTransitioning(false);
        }, 500);
      }, 25000);
    } else {
      setIsTransitioning(false);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isHomePage, nextIndex, images.length]);

  if (isHomePage) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0">
          <img
            key={`current-${currentIndex}`}
            src={images[currentIndex]}
            alt="Background"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              animation: isTransitioning ? 'none' : 'slowZoomLong 25s linear forwards',
              zIndex: 1
            }}
          />
          {isTransitioning && (
            <img
              key={`next-${nextIndex}`}
              src={images[nextIndex]}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-opacity duration-500"
              style={{ zIndex: 2 }}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" style={{ zIndex: 3 }}></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        <img
          src={currentBg}
          alt="Background"
          className={`absolute inset-0 w-full h-full object-cover object-center ${
            isPageTransitioning
              ? 'opacity-0 transition-opacity duration-500'
              : 'opacity-100'
          }`}
        />
        <img
          src={nextBg}
          alt="Background"
          className={`absolute inset-0 w-full h-full object-cover object-center ${
            isPageTransitioning
              ? 'opacity-100 transition-opacity duration-500'
              : 'opacity-0'
          }`}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none"></div>
    </div>
  );
});
