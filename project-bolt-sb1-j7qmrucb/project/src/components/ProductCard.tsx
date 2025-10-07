import { Heart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

export const ProductCard = ({ id, name, category, price, image, rating }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group cursor-pointer">
      <div className="glass-strong border border-white/20 glass-hover rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105">
        <div className="relative aspect-square overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-2xl sm:rounded-t-3xl product-image-masked"
          />
          <button className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 glass-strong border border-white/20 glass-hover rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-rose-400" />
          </button>

          <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => addToCart({
                id,
                name,
                price,
                image
              })}
              className="w-full py-2 sm:py-3 glass-strong border border-white/30 glass-hover text-white text-xs sm:text-sm tracking-wide transition-all rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-white/10"
            >
              Quick Add
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs tracking-widest text-white/70 uppercase">{category}</span>
            <div className="flex items-center space-x-1 glass-badge border border-white/20 glass-hover px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-orange-500 text-orange-500" />
              <span className="text-[10px] sm:text-xs text-white font-medium">{rating}</span>
            </div>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-white">{name}</h3>
          <p className="text-xl sm:text-2xl font-light text-white">${price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
