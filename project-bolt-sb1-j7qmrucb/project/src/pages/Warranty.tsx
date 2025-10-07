import { UnifiedBackground } from '../components/UnifiedBackground';
import { Shield, CheckCircle, FileText, AlertCircle, Clock, Wrench } from 'lucide-react';
import { useEffect } from 'react';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Warranty() {
  useEffect(() => {
    return setupGlassEffects();
  }, []);

  const warrantyPlans = [
    {
      name: 'Standard Warranty',
      duration: '1 Year',
      price: 'Included Free',
      features: [
        'Manufacturing defects coverage',
        'Hardware malfunctions',
        'Free replacement parts',
        'Priority support',
        'Software updates'
      ]
    },
    {
      name: 'Extended Warranty',
      duration: '2 Years',
      price: '$49',
      features: [
        'Everything in Standard',
        'Accidental damage coverage',
        'Battery replacement',
        'Expedited replacements',
        'Advanced troubleshooting'
      ],
      popular: true
    },
    {
      name: 'Lifetime Protection',
      duration: 'Lifetime',
      price: '$149',
      features: [
        'Everything in Extended',
        'Unlimited replacements',
        'Wear and tear coverage',
        'Lost device replacement',
        'White glove support'
      ]
    }
  ];

  const covered = [
    'Manufacturing defects in materials or workmanship',
    'Hardware malfunctions under normal use',
    'Battery defects (drops below 80% capacity)',
    'Software issues and firmware bugs',
    'Sensor accuracy problems',
    'Charging port and cable defects'
  ];

  const notCovered = [
    'Physical damage from drops or impacts',
    'Water damage (non-waterproof models)',
    'Damage from pet chewing or scratching',
    'Cosmetic wear and scratches',
    'Battery degradation from normal use',
    'Unauthorized repairs or modifications'
  ];

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Protection Plans
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Warranty &
              <br />
              <span className="italic font-serif text-orange-600">Protection</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Every EverPaw product comes with comprehensive warranty coverage. Choose the level of
              protection that's right for you and your pet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {warrantyPlans.map((plan, index) => (
              <div
                key={index}
                className={`glass-strong glass-hover rounded-2xl p-8 border relative overflow-visible group transition-all duration-300 ${
                  plan.popular ? 'border-orange-500/50' : 'border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="relative text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-orange-400 text-4xl font-bold mb-2">{plan.price}</div>
                  <div className="text-white/60 mb-6">{plan.duration} Coverage</div>
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-left">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'glass-badge border border-white/20 text-white hover:border-orange-500/50 hover:text-orange-400'
                  }`}>
                    {plan.price === 'Included Free' ? 'Included' : 'Add Protection'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="relative">
                <CheckCircle className="w-12 h-12 text-green-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">What's Covered</h2>
                <div className="space-y-4">
                  {covered.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="relative">
                <AlertCircle className="w-12 h-12 text-red-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">What's Not Covered</h2>
                <div className="space-y-4">
                  {notCovered.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12 relative overflow-visible group">
            <div className="relative">
              <div className="flex items-center space-x-3 mb-8">
                <Wrench className="w-8 h-8 text-orange-400" />
                <h2 className="text-4xl font-bold text-white">How to File a Warranty Claim</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="glass-badge glass-hover rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Contact Support</h3>
                  <p className="text-white/70 text-sm">
                    Reach out to our support team via phone, email, or chat
                  </p>
                </div>
                <div className="glass-badge glass-hover rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Provide Details</h3>
                  <p className="text-white/70 text-sm">
                    Share your order number and describe the issue
                  </p>
                </div>
                <div className="glass-badge glass-hover rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Send Device</h3>
                  <p className="text-white/70 text-sm">
                    Ship the device using our prepaid label
                  </p>
                </div>
                <div className="glass-badge glass-hover rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Get Replacement</h3>
                  <p className="text-white/70 text-sm">
                    Receive your repaired or replacement device
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12 relative overflow-visible group">
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-8">Warranty Terms & Conditions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start space-x-3 mb-6">
                    <FileText className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Proof of Purchase</h3>
                      <p className="text-white/70">
                        Valid warranty claims require proof of purchase. Keep your order confirmation
                        email or receipt as verification of your warranty coverage.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 mb-6">
                    <Clock className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Repair Timeframe</h3>
                      <p className="text-white/70">
                        Most repairs are completed within 5-7 business days. We'll send you a loaner
                        device for extended repairs exceeding 14 days.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Transferability</h3>
                      <p className="text-white/70">
                        Warranties are non-transferable and apply only to the original purchaser.
                        Extended warranties can be purchased within 30 days of device purchase.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Wrench className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Authorized Service</h3>
                      <p className="text-white/70">
                        Only repairs performed by EverPaw or authorized service centers are covered.
                        Unauthorized repairs void the warranty.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 text-center relative overflow-visible group">
            <div className="relative">
              <Shield className="w-16 h-16 text-orange-400 mb-6 mx-auto" />
              <h2 className="text-3xl font-bold text-white mb-4">Questions About Warranty?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Our warranty specialists are here to help you understand your coverage and file claims.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 glass-badge border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                  File Warranty Claim
                </button>
                <button className="px-10 py-4 glass-badge border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
