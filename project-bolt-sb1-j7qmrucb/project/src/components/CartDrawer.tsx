import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  useEffect(() => {
    const drawer = document.querySelector('.cart-drawer');
    const buttons = drawer?.querySelectorAll('.fluent-button');
    const cartItems = drawer?.querySelectorAll('.cart-item');

    const handleMouseMove = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleDrawerMouseMove = (e: MouseEvent) => {
      if (!drawer) return;
      const rect = drawer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (drawer as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (drawer as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    };

    if (drawer) {
      drawer.addEventListener('mousemove', handleDrawerMouseMove as EventListener);
    }

    buttons?.forEach((button) => {
      button.addEventListener('mousemove', handleMouseMove as EventListener);
    });

    cartItems?.forEach((item) => {
      item.addEventListener('mousemove', handleMouseMove as EventListener);
    });

    return () => {
      if (drawer) {
        drawer.removeEventListener('mousemove', handleDrawerMouseMove as EventListener);
      }
      buttons?.forEach((button) => {
        button.removeEventListener('mousemove', handleMouseMove as EventListener);
      });
      cartItems?.forEach((item) => {
        item.removeEventListener('mousemove', handleMouseMove as EventListener);
      });
    };
  }, [items, isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(0, 0, 0, 0.2)' }}
        onClick={toggleCart}
      />

      <div
        className={`cart-drawer fixed right-0 w-full sm:max-w-md z-40 shadow-2xl transform transition-transform duration-300 ease-in-out glass-strong ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          top: window.innerWidth < 640 ? '64px' : '80px',
          height: window.innerWidth < 640 ? 'calc(100vh - 64px)' : 'calc(100vh - 80px)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '-10px 0 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 relative border-b border-white/20 fluent-divider">
            <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none" style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maskImage: 'linear-gradient(to bottom, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)'
            }} />
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Shopping Cart
                {totalItems > 0 && (
                  <span className="ml-2 text-xs sm:text-sm font-normal text-white/70">
                    ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
            </div>
            <button
              onClick={toggleCart}
              className="p-1.5 sm:p-2 transition-colors hover:text-orange-400 relative z-20"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
              <ShoppingBag className="w-20 h-20 sm:w-24 sm:h-24 text-white/30 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Your cart is empty</h3>
              <p className="text-sm sm:text-base text-white/70 mb-6">Add some products to get started!</p>
              <button
                onClick={toggleCart}
                className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors fluent-button"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 relative" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
              }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item glass-strong glass-hover rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 transition-all duration-300"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl"
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    />
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{item.name}</h3>
                      <p className="text-sm sm:text-base text-orange-400 font-bold mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center space-x-1 sm:space-x-2 glass-badge rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1" style={{
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-0.5 sm:p-1 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-sm sm:text-base font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-0.5 sm:p-1 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 sm:p-2 glass-badge hover:border-red-500/40 rounded-lg transition-colors group"
                          style={{
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 group-hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 relative border-t border-white/20 fluent-divider">
                <div className="absolute inset-x-0 top-0 h-16 pointer-events-none" style={{
                  background: 'linear-gradient(to top, transparent, rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  maskImage: 'linear-gradient(to top, transparent, black)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent, black)'
                }} />
                <div className="flex justify-between items-center text-base sm:text-lg">
                  <span className="font-semibold text-white/90">Subtotal:</span>
                  <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm text-white/70">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <button className="w-full py-3 sm:py-4 text-sm sm:text-base bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-300 fluent-button hover:scale-105" style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)'
                }}>
                  Proceed to Checkout
                </button>
                <button
                  onClick={toggleCart}
                  className="w-full py-2.5 sm:py-3 text-sm sm:text-base glass-strong text-white font-semibold rounded-xl transition-all duration-300 fluent-button hover:scale-105"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
