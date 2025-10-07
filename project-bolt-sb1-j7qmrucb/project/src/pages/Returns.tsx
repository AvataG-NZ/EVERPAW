import { UnifiedBackground } from '../components/UnifiedBackground';
import { RotateCcw, Package, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Returns() {
  useEffect(() => {
    return setupGlassEffects();
  }, []);

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact our support team or start a return through your account dashboard'
    },
    {
      step: 2,
      title: 'Receive Label',
      description: 'We\'ll email you a prepaid return shipping label within 24 hours'
    },
    {
      step: 3,
      title: 'Ship Item',
      description: 'Pack the item securely and drop it off at any authorized carrier location'
    },
    {
      step: 4,
      title: 'Get Refund',
      description: 'Receive your refund within 5-7 business days after we receive the item'
    }
  ];

  const eligibleItems = [
    'Unopened products in original packaging',
    'Items purchased within the last 30 days',
    'Products with all accessories and documentation',
    'Non-personalized items',
    'Items not marked as final sale'
  ];

  const ineligibleItems = [
    'Opened hygiene products (collars, harnesses)',
    'Digital products or subscriptions',
    'Custom or personalized items',
    'Items past the 30-day return window',
    'Products damaged due to misuse'
  ];

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Returns Policy
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Returns &
              <br />
              <span className="italic font-serif text-orange-600">Refunds</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              We want you to love your purchase. If you're not completely satisfied, we offer
              hassle-free returns within 30 days of delivery.
            </p>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12 relative overflow-visible group">
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 115, 22, 0.1), transparent 40%)'
              }}
            />
            <div className="relative">
              <div className="flex items-center space-x-3 mb-8">
                <RotateCcw className="w-8 h-8 text-orange-400" />
                <h2 className="text-4xl font-bold text-white">Return Process</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {returnSteps.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="glass-badge glass-hover rounded-2xl p-6 border border-white/20 h-full">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold mb-4">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/70 text-sm">{item.description}</p>
                    </div>
                    {index < returnSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <div className="text-orange-400 text-2xl">→</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.1), transparent 40%)'
                }}
              />
              <div className="relative">
                <CheckCircle className="w-12 h-12 text-green-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">Eligible for Return</h2>
                <div className="space-y-4">
                  {eligibleItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239, 68, 68, 0.1), transparent 40%)'
                }}
              />
              <div className="relative">
                <XCircle className="w-12 h-12 text-red-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">Not Eligible for Return</h2>
                <div className="space-y-4">
                  {ineligibleItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12 relative overflow-visible group">
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 115, 22, 0.1), transparent 40%)'
              }}
            />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-8">Refund Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start space-x-3 mb-6">
                    <Clock className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Processing Time</h3>
                      <p className="text-white/70">
                        Refunds are processed within 5-7 business days after we receive and inspect
                        your return. You'll receive an email confirmation once processed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Refund Method</h3>
                      <p className="text-white/70">
                        Refunds are issued to your original payment method. Credit card refunds may
                        take 3-5 additional business days to appear on your statement.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start space-x-3 mb-6">
                    <Package className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Shipping Costs</h3>
                      <p className="text-white/70">
                        We provide free return shipping labels for defective items. For standard
                        returns, original shipping costs are non-refundable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Partial Refunds</h3>
                      <p className="text-white/70">
                        Items returned without original packaging or with signs of use may receive a
                        partial refund or store credit at our discretion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12 relative overflow-visible group">
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 115, 22, 0.1), transparent 40%)'
              }}
            />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-8">Exchanges</h2>
              <p className="text-white/70 text-lg mb-6">
                We currently don't offer direct exchanges. If you'd like a different item, please return
                your original purchase for a refund and place a new order. This ensures you get exactly
                what you want without delays.
              </p>
              <div className="glass-badge glass-hover rounded-2xl p-6 border border-orange-500/30">
                <h3 className="text-xl font-semibold text-white mb-3">Defective or Damaged Items</h3>
                <p className="text-white/70">
                  If you receive a defective or damaged item, please contact us immediately. We'll send
                  a replacement at no cost to you, and you won't need to return the defective item unless
                  requested for quality assurance purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 text-center relative overflow-visible group">
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 115, 22, 0.1), transparent 40%)'
              }}
            />
            <div className="relative">
              <RotateCcw className="w-16 h-16 text-orange-400 mb-6 mx-auto" />
              <h2 className="text-3xl font-bold text-white mb-4">Need to Start a Return?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Our customer service team is ready to help you with your return. We'll make the process
                as easy as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 glass-badge border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 hover:scale-105 fluent-button">
                  Start Return Request
                </button>
                <button className="px-10 py-4 glass-badge border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 hover:scale-105 fluent-button">
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
