import { ShoppingBag, Search, Menu, Heart, User, ChevronRight, Star, Sparkles, Award, Shield, Clock, Zap, TrendingUp, Activity, Bell, MapPin, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DynamicGradientImage } from '../components/DynamicGradientImage';
import { ProductCard } from '../components/ProductCard';
import { CustomPawIcon } from '../components/CustomPawIcon';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';

export function Home() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const [betaEmail, setBetaEmail] = useState('');
  const [betaSubmitted, setBetaSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [petParentsCount, setPetParentsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [isCountComplete, setIsCountComplete] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => {
              if (prev.has(sectionId)) return prev;
              return new Set(prev).add(sectionId);
            });

            if (sectionId === 'stats' && !hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              const duration = 5000;
              const startTime = Date.now();

              const petParentsTarget = 50000;
              const ratingTarget = 4.9;
              const satisfactionTarget = 95;

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOutQuad = (t: number) => t * (2 - t);
                const easedProgress = easeOutQuad(progress);

                setPetParentsCount(Math.floor(easedProgress * petParentsTarget));
                setAverageRating(parseFloat((easedProgress * ratingTarget).toFixed(1)));
                setSatisfaction(Math.floor(easedProgress * satisfactionTarget));

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setPetParentsCount(petParentsTarget);
                  setAverageRating(ratingTarget);
                  setSatisfaction(satisfactionTarget);
                  setTimeout(() => setIsCountComplete(true), 100);
                }
              };

              requestAnimationFrame(animate);
            }
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const cards = document.querySelectorAll('.glass-hover, .home-card');
    const searchContainer = document.querySelector('.search-container');
    const nav = document.querySelector('.glass-nav');
    const buttons = document.querySelectorAll('.fluent-button');

    const handleCardMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);

      if (card.classList.contains('search-container')) {
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const rotateY = deltaX * 2;
      const rotateX = -deltaY * 2;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    };

    const handleNavMouseMove = (e: MouseEvent) => {
      const navElement = e.currentTarget as HTMLElement;
      const rect = navElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      navElement.style.setProperty('--mouse-x', `${x}%`);
      navElement.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleButtonMouseMove = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--mouse-x', `${x}%`);
      button.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      if (!card.classList.contains('search-container')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleCardMouseMove as EventListener);
      card.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    if (nav) {
      nav.addEventListener('mousemove', handleNavMouseMove as EventListener);
    }

    buttons.forEach((button) => {
      button.addEventListener('mousemove', handleButtonMouseMove as EventListener);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleCardMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
      if (nav) {
        nav.removeEventListener('mousemove', handleNavMouseMove as EventListener);
      }
      buttons.forEach((button) => {
        button.removeEventListener('mousemove', handleButtonMouseMove as EventListener);
      });
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (searchOpen && !target.closest('.search-container')) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [searchOpen]);

  const handleFeatureClick = useCallback((featureId: string) => {
    navigate('/features', { state: { section: featureId } });
  }, [navigate]);

  const handleBetaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('beta_signups').insert([
        {
          name: 'Beta Subscriber',
          email: betaEmail,
          pets: 'Quick signup from home page',
          experience: 'Email capture form submission',
        },
      ]);

      if (error) throw error;

      setBetaSubmitted(true);
      setBetaEmail('');
    } catch (error) {
      console.error('Error submitting:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredProducts = [
    {
      id: 1,
      name: 'Luxury Pet Bed',
      category: 'Comfort',
      price: 189.00,
      image: '/2_beds.webp',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Designer Ceramic Bowl Set',
      category: 'Dining',
      price: 79.00,
      image: '/TravertineCatDog_3.webp',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Premium Grooming Kit',
      category: 'Wellness',
      price: 129.00,
      image: '/groomer-and-white-dog-969094132-2000-c6a957c9f7d04dceb4f16101a8997d92.jpg',
      rating: 5.0
    },
    {
      id: 4,
      name: 'Artisan Leather Leash',
      category: 'Accessories',
      price: 95.00,
      image: '/COCOA-CINNAMON-LEAD.jpg',
      rating: 4.7
    }
  ];

  const categories = [
    { name: 'Nutrition', count: 124, color: 'from-orange-400/20 to-amber-500/20' },
    { name: 'Wellness', count: 89, color: 'from-amber-400/20 to-orange-500/20' },
    { name: 'Comfort', count: 156, color: 'from-orange-300/20 to-amber-400/20' },
    { name: 'Play', count: 203, color: 'from-amber-400/20 to-orange-500/20' },
    { name: 'Travel', count: 67, color: 'from-orange-400/20 to-amber-500/20' },
    { name: 'Grooming', count: 94, color: 'from-amber-300/20 to-orange-400/20' }
  ];

  return (
    <>
      {searchOpen && (
        <div
          className="fixed inset-0 z-40 transition-all duration-700"
          style={{ backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(0, 0, 0, 0.2)' }}
          onClick={() => setSearchOpen(false)}
        />
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-20 right-0 bottom-0 w-64 glass-strong border-l border-white/20 p-8">
            <div className="flex flex-col space-y-6">
              <Link to="/features" className="text-lg text-white hover:text-orange-400">Features</Link>
              <Link to="/about" className="text-lg text-white hover:text-orange-400">About</Link>
              <Link to="/shop" className="text-lg text-white hover:text-orange-400">Shop</Link>
              <Link to="/contact" className="text-lg text-white hover:text-orange-400">Contact</Link>
            </div>
          </div>
        </div>
      )}

      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase">
                  Curated Excellence
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight">
                Elevated
                <br />
                <span className="italic font-serif text-orange-600">Living</span> for
                <br />
                Your Companion
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                Discover our thoughtfully curated collection of premium products designed to enhance every moment with your pet.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Link to="/beta" className="group px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white text-sm tracking-wide hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl relative overflow-hidden font-medium fluent-button hover:bg-orange-600 text-center">
                  <span className="relative z-10">Join Beta</span>
                </Link>
                <button className="px-6 sm:px-8 py-3 sm:py-4 glass-strong border border-white/20 glass-hover text-white text-sm tracking-wide transition-all duration-300 rounded-2xl fluent-button">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 relative overflow-hidden" data-section="stats">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-[1.02] transition-all duration-500">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 min-h-[80px]">
              <div className={`text-center transition-all duration-700 ${visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: visibleSections.has('stats') ? '0.1s' : '0s'}}>
                <div className="inline-block min-w-[90px]">
                  <div className={`text-2xl sm:text-3xl font-light text-white mb-1 transition-all duration-500 tabular-nums ${isCountComplete ? 'scale-110' : 'scale-100'}`}>
                    {petParentsCount < 50000
                      ? petParentsCount.toLocaleString()
                      : '50K+'}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-white/60">Pet Parents</div>
              </div>
              <div className={`trust-divider w-px h-8 sm:h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent transition-all duration-700 ${visibleSections.has('stats') ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: visibleSections.has('stats') ? '0.15s' : '0s'}}></div>
              <div className={`text-center transition-all duration-700 ${visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: visibleSections.has('stats') ? '0.2s' : '0s'}}>
                <div className="inline-block min-w-[60px]">
                  <div className={`text-2xl sm:text-3xl font-light text-white mb-1 transition-all duration-500 tabular-nums ${isCountComplete ? 'scale-110' : 'scale-100'}`}>
                    {averageRating.toFixed(1)}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-white/60">Average Rating</div>
              </div>
              <div className={`trust-divider w-px h-8 sm:h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent transition-all duration-700 ${visibleSections.has('stats') ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: visibleSections.has('stats') ? '0.25s' : '0s'}}></div>
              <div className={`text-center transition-all duration-700 ${visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: visibleSections.has('stats') ? '0.3s' : '0s'}}>
                <div className="inline-block min-w-[70px]">
                  <div className={`text-2xl sm:text-3xl font-light text-white mb-1 transition-all duration-500 tabular-nums ${isCountComplete ? 'scale-110' : 'scale-100'}`}>
                    {satisfaction}%
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-white/60">Satisfaction</div>
              </div>
              <div className={`trust-divider w-px h-8 sm:h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent transition-all duration-700 ${visibleSections.has('stats') ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: visibleSections.has('stats') ? '0.35s' : '0s'}}></div>
              <div className={`text-center transition-all duration-700 ${visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: visibleSections.has('stats') ? '0.4s' : '0s'}}>
                <div className="text-2xl sm:text-3xl font-light text-white mb-1">24/7</div>
                <div className="text-xs sm:text-sm text-white/60">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
              The <span className="italic font-serif text-orange-600">Problem</span> We Solve
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Pet parents face real challenges in keeping their companions healthy and happy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-500">
              <div className="glass-badge border border-orange-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-3">Hidden Health Issues</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Pets can't tell us when they're unwell. Early detection is critical but often missed until it's too late.
              </p>
            </div>

            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-500">
              <div className="glass-badge border border-orange-500/30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-3">Time-Consuming Care</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Tracking appointments, medications, diet, and exercise becomes overwhelming for busy pet owners.
              </p>
            </div>

            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-500">
              <div className="glass-badge border border-orange-500/30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-3">Safety Concerns</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Lost pets, unsafe environments, and lack of real-time location tracking cause constant worry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
              How <span className="italic font-serif text-orange-600">It Works</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Get started with EverPaw in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover:scale-105 transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-badge border border-orange-500/30 mb-6">
                <span className="text-2xl sm:text-3xl font-light text-orange-500">1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4">Setup Your Profile</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Create profiles for your pets with their health history, preferences, and unique needs.
              </p>
            </div>

            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover:scale-105 transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-badge border border-orange-500/30 mb-6">
                <span className="text-2xl sm:text-3xl font-light text-orange-500">2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4">Connect Your Device</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Pair the EverPaw collar for real-time health monitoring and location tracking.
              </p>
            </div>

            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 hover:scale-105 transition-all duration-500 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass-badge border border-orange-500/30 mb-6">
                <span className="text-2xl sm:text-3xl font-light text-orange-500">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white mb-4">Get AI-Powered Insights</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Receive personalized recommendations and alerts to keep your pet healthy and safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
              Powerful <span className="italic font-serif text-orange-600">Features</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Everything you need to care for your pet, all in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div onClick={() => handleFeatureClick('health')} className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="glass-badge border border-orange-500/30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Health Monitoring</h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Real-time tracking of vitals, activity levels, and sleep patterns with AI analysis.
              </p>
            </div>

            <div onClick={() => handleFeatureClick('safety')} className="home-card glass-strong border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="glass-badge border border-orange-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">GPS Tracking</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Live location tracking with geofencing alerts to keep your pet safe.
              </p>
            </div>

            <div onClick={() => handleFeatureClick('avatar')} className="home-card glass-strong border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="glass-badge border border-orange-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Pet Avatar</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Chat with an AI version of your pet that learns their personality and needs.
              </p>
            </div>

            <Link to="/features" className="home-card glass-strong border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="glass-badge border border-orange-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Alerts</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Intelligent notifications for medications, vet appointments, and health changes.
              </p>
            </Link>

            <div onClick={() => handleFeatureClick('training')} className="home-card glass-strong border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="glass-badge border border-orange-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Training & Coaching</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Personalized training plans with progress tracking and behavioral insights.
              </p>
            </div>

            <div onClick={() => handleFeatureClick('ai-voice')} className="home-card glass-strong border border-white/20 rounded-3xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="glass-badge border border-orange-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Voice Assistant</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Voice-activated commands to check on your pet and get instant updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
                Featured <span className="italic font-serif text-orange-600">Products</span>
              </h2>
              <p className="text-white/90 text-base sm:text-lg">Handpicked by our expert curators</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center space-x-2 glass-badge border border-white/20 glass-hover px-6 py-3 rounded-full text-white hover:text-orange-400 transition-all group">
              <span className="text-sm tracking-wide">View All</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                image={product.image}
                rating={product.rating}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
              Simple <span className="italic font-serif text-orange-600">Pricing</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Choose the perfect plan for your pet family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-light text-white">$0</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white/80 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Basic health tracking
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  1 pet profile
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Weekly reports
                </li>
              </ul>
              <Link to="/pricing" className="w-full block text-center py-2.5 sm:py-3 text-sm glass-strong border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all fluent-button">
                Get Started
              </Link>
            </div>

            <div className="home-card glass-strong border-2 border-orange-500/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-500 relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="glass-strong border border-orange-500/50 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full flex items-center space-x-2 backdrop-blur-xl"
                     style={{
                       background: 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(251,146,60,0.9))',
                       boxShadow: '0 0 30px rgba(249,115,22,0.6), inset 0 1px 1px rgba(255,255,255,0.3)'
                     }}>
                  <img src="/LOGOh cghjopy.png" alt="Paw" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-xs sm:text-sm text-white font-semibold">Most Popular</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-light text-white">$9.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white/80 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Real-time health alerts
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Up to 3 pet profiles
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  AI-powered insights
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Priority support
                </li>
              </ul>
              <Link to="/pricing" className="w-full block text-center py-2.5 sm:py-3 text-sm bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all fluent-button">
                Start Free Trial
              </Link>
            </div>

            <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-105 transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Family</h3>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-light text-white">$19.99</span>
                <span className="text-white/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white/80 text-xs sm:text-sm">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Everything in Pro
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Unlimited pet profiles
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Family sharing
                </li>
                <li className="flex items-center text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  Dedicated support
                </li>
              </ul>
              <Link to="/pricing" className="w-full block text-center py-2.5 sm:py-3 text-sm glass-strong border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all fluent-button">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="home-card glass-strong border border-white/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 glass-strong border border-orange-500/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 backdrop-blur-xl"
                   style={{
                     background: 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(251,146,60,0.9))',
                     boxShadow: '0 0 30px rgba(249,115,22,0.6), inset 0 1px 1px rgba(255,255,255,0.3)'
                   }}>
                <img src="/LOGOh cghjopy.png" alt="Paw" className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm text-white font-semibold">Join the Beta</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
                Be Among the First
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-8">
                Get early access to EverPaw and help shape the future of pet care technology. Limited spots available.
              </p>

              {betaSubmitted ? (
                <div className="py-8">
                  <CheckCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-white text-lg">Thank you! We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleBetaSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={betaEmail}
                    onChange={(e) => setBetaEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="fluent-input flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl glass-strong border border-white/20 focus:outline-none focus:border-orange-500/60 text-white placeholder-white/60 transition-all duration-300 text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500 text-white text-sm tracking-wide hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl whitespace-nowrap font-medium fluent-button hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Beta'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
