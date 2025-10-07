import { ShoppingBag, Search, Menu, Heart, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useRewards } from '../contexts/RewardsContext';
import { products } from '../data/products';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, toggleCart, isOpen: cartOpen, addToCart } = useCart();
  const { points, toggleRewards, isOpen: rewardsOpen } = useRewards();

  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (searchOpen && !target.closest('.search-container')) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    const nav = document.querySelector('.glass-nav');

    const handleNavMouseMove = (e: MouseEvent) => {
      const navElement = e.currentTarget as HTMLElement;
      const rect = navElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      navElement.style.setProperty('--mouse-x', `${x}%`);
      navElement.style.setProperty('--mouse-y', `${y}%`);
    };

    if (nav) {
      nav.addEventListener('mousemove', handleNavMouseMove as EventListener);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      if (nav) {
        nav.removeEventListener('mousemove', handleNavMouseMove as EventListener);
      }
    };
  }, [searchOpen]);

  return (
    <>
      {searchOpen && (
        <div
          className="fixed inset-0 z-40 transition-all duration-700"
          style={{ backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(0, 0, 0, 0.2)' }}
          onClick={() => setSearchOpen(false)}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 ${searchOpen ? 'pointer-events-none' : 'glass-nav'} border-b border-white/20 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-white/15 shadow-2xl' : 'backdrop-blur-md bg-white/10'} ${searchOpen ? 'shadow-none' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pointer-events-auto">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-8 sm:space-x-16">
              <Link to="/" className="relative h-16 sm:h-20 flex items-center">
                <img
                  src="/LOGOd.png"
                  alt="Everpaw"
                  className="h-12 sm:h-14 hidden lg:block transition-all duration-500 ease-in-out"
                />
                <img
                  src="/LOGOh.png"
                  alt="Everpaw"
                  className="h-8 sm:h-10 lg:hidden transition-all duration-500 ease-in-out"
                />
              </Link>

              <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
                <Link to="/" className={`text-xs xl:text-sm tracking-wide transition-colors ${location.pathname === '/' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`}>Home</Link>
                <Link to="/features" className={`text-xs xl:text-sm tracking-wide transition-colors ${location.pathname === '/features' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`}>Features</Link>
                <Link to="/about" className={`text-xs xl:text-sm tracking-wide transition-colors ${location.pathname === '/about' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`}>About</Link>
                <Link to="/shop" className={`text-xs xl:text-sm tracking-wide transition-colors ${location.pathname === '/shop' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`}>Shop</Link>
                <Link to="/contact" className={`text-xs xl:text-sm tracking-wide transition-colors ${location.pathname === '/contact' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`}>Contact</Link>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
              <button
                onClick={() => {
                  if (cartOpen) toggleCart();
                  if (rewardsOpen) toggleRewards();
                  setSearchOpen(!searchOpen);
                }}
                className="text-white hover:text-orange-400 transition-colors"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="text-white hover:text-orange-400 transition-colors hidden sm:block">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => {
                  if (searchOpen) setSearchOpen(false);
                  if (cartOpen) toggleCart();
                  toggleRewards();
                }}
                className="relative text-white hover:text-orange-400 transition-colors"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {points > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] sm:min-w-[16px] h-3.5 sm:h-4 bg-orange-500 text-white text-[9px] sm:text-[10px] rounded-full flex items-center justify-center px-1">
                    {points > 999 ? '999+' : points}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  if (searchOpen) setSearchOpen(false);
                  if (rewardsOpen) toggleRewards();
                  toggleCart();
                }}
                className="relative text-white hover:text-orange-400 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-orange-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="lg:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full overflow-visible transition-all duration-700 ease-out z-50 ${
            searchOpen ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
            <div className="relative group search-container glass-hover rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl" style={{ backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(255, 255, 255, 0.15)' }}>
                <div className="flex items-center px-4 py-3 sm:px-6 sm:py-4">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mr-3 sm:mr-4 animate-pulse" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for premium pet products..."
                    className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none text-sm sm:text-base md:text-lg"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-4 text-white/60 hover:text-white transition-colors"
                    >
                      <span className="text-xl">×</span>
                    </button>
                  )}
                </div>

                {searchQuery && (
                  <div className="border-t border-white/10 p-6 space-y-3 animate-fade-in" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    {filteredProducts.length > 0 ? (
                      <>
                        <p className="text-sm text-white/60 mb-4">{filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found</p>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {filteredProducts.map((product) => (
                            <div
                              key={product.id}
                              className="glass-badge border border-white/20 glass-hover rounded-2xl p-4 flex items-center space-x-4 hover:border-orange-500/40 transition-all cursor-pointer"
                              onClick={() => {
                                if (product.id === 999) {
                                  navigate('/shop');
                                  setSearchOpen(false);
                                  setSearchQuery('');
                                }
                              }}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 rounded-xl object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="text-white font-medium">{product.name}</h4>
                                <p className="text-white/60 text-sm">{product.category}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-white font-semibold">${product.price.toFixed(2)}</div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                    setSearchOpen(false);
                                    setSearchQuery('');
                                  }}
                                  className="mt-2 px-4 py-1.5 bg-orange-500 text-white text-xs rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-white/60 mb-4">Popular searches</p>
                        <div className="flex flex-wrap gap-2">
                          {['Smart Collar', 'Luxury Bed', 'Grooming Kit', 'Designer Bowl', 'Grooming Vacuum'].map((suggestion) => (
                            <button
                              key={suggestion}
                              onClick={() => setSearchQuery(suggestion)}
                              className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-sm text-white/90 hover:text-white hover:border-orange-500/40 transition-all hover:scale-105"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                        <div className="pt-4 mt-4 border-t border-white/10">
                          <p className="text-sm text-white/80 italic">No results found for "{searchQuery}"</p>
                          <p className="text-xs text-white/60 mt-2">Try searching for Smart Collar, Luxury Bed, or Grooming Kit</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-16 sm:top-20 right-0 bottom-0 w-56 sm:w-64 glass-strong border-l border-white/20 p-6 sm:p-8">
            <div className="flex flex-col space-y-5 sm:space-y-6">
              <Link to="/" className={`text-base sm:text-lg transition-colors ${location.pathname === '/' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/features" className={`text-base sm:text-lg transition-colors ${location.pathname === '/features' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`} onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link to="/about" className={`text-base sm:text-lg transition-colors ${location.pathname === '/about' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`} onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/shop" className={`text-base sm:text-lg transition-colors ${location.pathname === '/shop' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`} onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/contact" className={`text-base sm:text-lg transition-colors ${location.pathname === '/contact' ? 'text-orange-400' : 'text-white hover:text-orange-400'}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
