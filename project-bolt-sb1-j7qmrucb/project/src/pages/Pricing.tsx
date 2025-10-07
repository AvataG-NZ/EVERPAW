import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { CustomPawIcon } from '../components/CustomPawIcon';

export default function Pricing() {
  useEffect(() => {
    const cards = document.querySelectorAll('.pricing-card');

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove as EventListener);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove as EventListener);
      });
    };
  }, []);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out EverPaw',
      features: [
        'Basic health tracking',
        'Activity monitoring',
        'Weekly health reports',
        'Community access',
        '1 pet profile',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For dedicated pet parents',
      features: [
        'Everything in Free',
        'Real-time health alerts',
        'AI-powered insights',
        'Vet consultation access',
        'Up to 3 pet profiles',
        'Premium support',
        'Custom health goals',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Family',
      price: '$19.99',
      period: 'per month',
      description: 'For multi-pet households',
      features: [
        'Everything in Pro',
        'Unlimited pet profiles',
        'Family sharing',
        'Advanced analytics',
        'Priority vet access',
        'Custom integrations',
        'Dedicated account manager',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 bg-gradient-to-b from-black/30 via-transparent to-black/30">
      <section className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Pricing Plans
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Simple, Transparent
              <br />
              <span className="italic font-serif text-orange-600">Pricing</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Choose the perfect plan for your pet family. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative glass-strong border ${
                plan.popular ? 'border-orange-500/50' : 'border-white/20'
              } rounded-3xl p-8 hover:scale-105 transition-all duration-500`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="glass-strong border border-orange-500/50 px-4 py-1.5 rounded-full flex items-center space-x-2 backdrop-blur-xl"
                       style={{
                         background: 'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(251,146,60,0.9))',
                         boxShadow: '0 0 30px rgba(249,115,22,0.6), inset 0 1px 1px rgba(255,255,255,0.3)'
                       }}>
                    <img src="/LOGOh cghjopy.png" alt="Paw" className="w-6 h-6" />
                    <span className="text-sm text-white font-semibold">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-light text-white">{plan.price}</span>
                  <span className="text-white/60 ml-2">/{plan.period}</span>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-xl font-medium mb-8 transition-all fluent-button border ${
                  plan.popular
                    ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500/50'
                    : 'glass-strong border-white/30 text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-strong border border-white/20 rounded-3xl p-12 text-center pricing-card">
          <h2 className="text-3xl font-light text-white mb-4">
            Need a custom solution?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            For veterinary clinics, shelters, and enterprise organizations, we offer custom plans tailored to your needs.
          </p>
          <button className="fluent-button glass-strong border border-white/30 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-all">
            Contact Sales
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-strong border border-white/20 rounded-2xl p-8 text-center pricing-card">
            <h3 className="text-xl font-semibold text-white mb-3">14-Day Free Trial</h3>
            <p className="text-white/70 text-sm">
              Try any plan risk-free. No credit card required.
            </p>
          </div>
          <div className="glass-strong border border-white/20 rounded-2xl p-8 text-center pricing-card">
            <h3 className="text-xl font-semibold text-white mb-3">Cancel Anytime</h3>
            <p className="text-white/70 text-sm">
              No long-term contracts. Cancel with a single click.
            </p>
          </div>
          <div className="glass-strong border border-white/20 rounded-2xl p-8 text-center pricing-card">
            <h3 className="text-xl font-semibold text-white mb-3">Money-Back Guarantee</h3>
            <p className="text-white/70 text-sm">
              Not satisfied? Get a full refund within 30 days.
            </p>
          </div>
        </div>
        </div>
      </section>
      </div>
    </div>
  );
}
