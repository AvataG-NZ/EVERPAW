import { Battery, Droplet, Ruler, Shield, Smartphone, Clock, Package, Truck, RotateCcw, MessageCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../contexts/CartContext';

export function Shop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addToCart } = useCart();

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.glass-hover');
    const buttons = document.querySelectorAll('.fluent-button');
    const dividers = document.querySelectorAll('.fluent-divider');
    const iconCircles = document.querySelectorAll('.icon-circle');

    const handleCardMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const rotateY = deltaX * 2;
      const rotateX = -deltaY * 2;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    };

    const handleButtonMouseMove = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty('--mouse-x', `${x}%`);
      button.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleDividerMouseMove = (e: MouseEvent) => {
      const divider = e.currentTarget as HTMLElement;
      const rect = divider.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      divider.style.setProperty('--mouse-x', `${x}%`);
    };

    const handleIconCircleMouseMove = (e: MouseEvent) => {
      const circle = e.currentTarget as HTMLElement;
      const rect = circle.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      circle.style.setProperty('--mouse-x', `${x}%`);
      circle.style.setProperty('--mouse-y', `${y}%`);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleCardMouseMove as EventListener);
      card.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    buttons.forEach((button) => {
      button.addEventListener('mousemove', handleButtonMouseMove as EventListener);
    });

    dividers.forEach((divider) => {
      divider.addEventListener('mousemove', handleDividerMouseMove as EventListener);
    });

    iconCircles.forEach((circle) => {
      circle.addEventListener('mousemove', handleIconCircleMouseMove as EventListener);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleCardMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
      buttons.forEach((button) => {
        button.removeEventListener('mousemove', handleButtonMouseMove as EventListener);
      });
      dividers.forEach((divider) => {
        divider.removeEventListener('mousemove', handleDividerMouseMove as EventListener);
      });
      iconCircles.forEach((circle) => {
        circle.removeEventListener('mousemove', handleIconCircleMouseMove as EventListener);
      });
    };
  }, []);

  const specs = [
    { icon: Battery, label: 'Battery Life', value: '7-10 days' },
    { icon: Shield, label: 'Sensors', value: 'Heart rate, GPS, Activity' },
    { icon: Droplet, label: 'Waterproof', value: 'IP67 rated' },
    { icon: Ruler, label: 'Sizes', value: 'Small, Medium, Large' },
    { icon: Smartphone, label: 'Requirements', value: 'iOS 14+ / Android 10+' },
    { icon: Clock, label: 'Warranty', value: '2 years' }
  ];

  const sizes = [
    { size: 'Small', neck: '8-12 inches', weight: 'Up to 20 lbs', breeds: 'Chihuahua, Yorkie, Pomeranian' },
    { size: 'Medium', neck: '12-18 inches', weight: '20-50 lbs', breeds: 'Beagle, Corgi, Bulldog' },
    { size: 'Large', neck: '18-24 inches', weight: '50+ lbs', breeds: 'Labrador, German Shepherd, Golden Retriever' }
  ];

  const boxContents = [
    'EverPaw Smart Collar',
    'USB-C Charging Cable',
    'Quick Start Guide',
    'Collar Sizing Tool',
    '2-Year Warranty Card'
  ];

  const setupSteps = [
    { step: 1, title: 'Download App', description: 'Get the EverPaw app from App Store or Google Play' },
    { step: 2, title: 'Charge & Pair', description: 'Charge your collar and pair via Bluetooth' },
    { step: 3, title: 'Fit & Activate', description: 'Size the collar and complete your pet profile' }
  ];

  const faqs = [
    {
      question: 'How long does the battery last?',
      answer: 'The EverPaw collar battery lasts 7-10 days on a single charge, depending on usage. You\'ll receive low battery notifications in the app.'
    },
    {
      question: 'Is it safe for my pet to wear all day?',
      answer: 'Yes! The collar is designed with pet safety in mind. It\'s lightweight, comfortable, and uses low-energy sensors that are completely safe for continuous wear.'
    },
    {
      question: 'What\'s your return policy?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied, return the collar for a full refund—no questions asked.'
    },
    {
      question: 'Does it work with cats?',
      answer: 'Yes! Our Small size is perfect for cats over 8 lbs. The collar is designed to be lightweight and comfortable for both dogs and cats.'
    },
    {
      question: 'What about subscription fees?',
      answer: 'Basic health monitoring is free forever. Premium features like advanced AI coaching and extended health history cost $9.99/month.'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 bg-gradient-to-b from-black/30 via-transparent to-black/30">
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-6 sm:mb-8">
              Biometric Smart Collar
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-6 sm:mb-8">
              Smarter Wellness
              <br />
              <span className="italic font-serif text-orange-600">Starts Here</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-8 px-4">
              The most advanced pet health monitoring system. Real-time vitals, GPS tracking, and AI-powered insights—all in one elegant collar.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-20 sm:mb-32">
            <div className="glass-strong border border-white/20 glass-hover rounded-2xl sm:rounded-[3rem] p-6 sm:p-12 aspect-square flex items-center justify-center bg-gradient-to-br from-orange-500/5 to-amber-500/5">
              <img
                src="/Screenshot 2025-10-04 035827-gigapixel-redefine-realistic-6x.jpg"
                alt="EverPaw Smart Collar"
                className="w-full h-full object-cover rounded-xl sm:rounded-3xl"
              />
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="text-4xl sm:text-5xl font-light text-white mb-4">$149.99</div>
                <p className="text-sm sm:text-base text-white/70 mb-6">One-time purchase • Free shipping • 30-day returns</p>
                <button
                  onClick={() => addToCart({
                    id: 999,
                    name: 'Biometric Smart Collar',
                    price: 149.99,
                    image: '/Screenshot 2025-10-04 035827-gigapixel-redefine-realistic-6x.jpg'
                  })}
                  className="w-full sm:w-auto px-8 py-4 sm:px-12 sm:py-5 bg-orange-500 text-white text-sm sm:text-base tracking-wide hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl font-medium fluent-button hover:bg-orange-600"
                >
                  Preorder Now
                </button>
              </div>

              <div className="border-t border-white/50 fluent-divider pt-6 sm:pt-8">
                <h3 className="text-xl sm:text-2xl font-light text-white mb-4">What You Get</h3>
                <ul className="space-y-3">
                  {['Real-time health monitoring', 'GPS tracking & geofencing', 'AI-powered health insights', 'Training & coaching tools', 'Free mobile app', '2-year warranty'].map((item) => (
                    <li key={item} className="flex items-center space-x-3 text-sm sm:text-base text-white/90">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 text-sm">✓</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-20 sm:mb-32">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-8 sm:mb-12 text-center tracking-tight">
              Technical <span className="italic font-serif text-orange-600">Specifications</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {specs.map((spec) => (
                <div key={spec.label} className="glass-strong border border-white/20 glass-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-4 sm:mb-6 icon-circle overflow-hidden group">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{
                           background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(251, 146, 60, 0.3) 0%, transparent 50%)'
                         }} />
                    <spec.icon className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500 relative z-10" />
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mb-2">{spec.label}</div>
                  <div className="text-lg sm:text-xl font-light text-white">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-32">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-12 text-center tracking-tight">
              Size & <span className="italic font-serif text-orange-600">Compatibility</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {sizes.map((size) => (
                <div key={size.size} className="glass-strong border border-white/20 glass-hover rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-medium text-white mb-2">{size.size}</div>
                    <div className="text-orange-500 text-sm">{size.neck}</div>
                  </div>
                  <div className="space-y-3 border-t border-white/50 fluent-divider pt-6">
                    <div>
                      <div className="text-xs text-white/60 mb-1">Weight Range</div>
                      <div className="text-white/90">{size.weight}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Common Breeds</div>
                      <div className="text-sm text-white/80">{size.breeds}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-32">
            <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12">
              <h3 className="text-3xl font-light text-white mb-8">What's in the Box</h3>
              <ul className="space-y-4">
                {boxContents.map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-white/90">
                    <Package className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 bg-gradient-to-br from-orange-500/5 to-amber-500/5">
              <h3 className="text-3xl font-light text-white mb-8">Setup Steps</h3>
              <div className="space-y-6">
                {setupSteps.map((step) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0 text-white font-medium">
                      {step.step}
                    </div>
                    <div>
                      <div className="text-lg font-medium text-white mb-1">{step.title}</div>
                      <div className="text-sm text-white/70">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 lg:p-16 mb-32">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-12 text-center">
              Shipping & <span className="italic font-serif text-orange-600">Support</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Free Shipping</h3>
                <p className="text-white/70 text-sm">Orders over $100 ship free worldwide. Delivery in 5-7 business days.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">30-Day Returns</h3>
                <p className="text-white/70 text-sm">Not satisfied? Return within 30 days for a full refund—no questions asked.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">24/7 Support</h3>
                <p className="text-white/70 text-sm">Our pet care experts are here to help via chat, email, or phone anytime.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-12 text-center tracking-tight">
              Frequently Asked <span className="italic font-serif text-orange-600">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-strong border border-white/20 glass-hover rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg text-white font-medium">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/70 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-8 pb-6 text-white/80 leading-relaxed border-t border-white/50 fluent-divider pt-6">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
