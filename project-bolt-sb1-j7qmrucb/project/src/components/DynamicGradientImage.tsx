import { useEffect, useRef, useState } from 'react';
import { extractDominantColor, rgbToTailwindOpacity } from '../utils/colorExtractor';

interface DynamicGradientImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

export const DynamicGradientImage = ({ src, alt, className = '', children }: DynamicGradientImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [gradientColors, setGradientColors] = useState({
    from: 'rgba(249, 115, 22, 0.5)',
    via: 'rgba(251, 146, 60, 0.2)',
  });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const loadColors = async () => {
      try {
        const dominantColor = await extractDominantColor(img);
        const from = rgbToTailwindOpacity(dominantColor, 0.6);
        const via = rgbToTailwindOpacity(dominantColor, 0.25);
        setGradientColors({ from, via });
      } catch (error) {
        console.error('Error extracting color:', error);
      }
    };

    loadColors();
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover rounded-[3rem]"
      />

      <div
        className="absolute inset-0 rounded-[3rem] pointer-events-none transition-all duration-700"
        style={{
          background: `linear-gradient(to top, ${gradientColors.from}, ${gradientColors.via}, transparent)`
        }}
      />

      {children}
    </div>
  );
};
