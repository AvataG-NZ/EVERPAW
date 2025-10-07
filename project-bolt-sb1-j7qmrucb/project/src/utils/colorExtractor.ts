import ColorThief from 'colorthief';

const colorThief = new ColorThief();

export const extractDominantColor = (imgElement: HTMLImageElement): Promise<[number, number, number]> => {
  return new Promise((resolve, reject) => {
    if (imgElement.complete) {
      try {
        const color = colorThief.getColor(imgElement);
        resolve(color);
      } catch (error) {
        reject(error);
      }
    } else {
      imgElement.addEventListener('load', () => {
        try {
          const color = colorThief.getColor(imgElement);
          resolve(color);
        } catch (error) {
          reject(error);
        }
      });
      imgElement.addEventListener('error', reject);
    }
  });
};

export const rgbToTailwindOpacity = (rgb: [number, number, number], opacity: number): string => {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
};
