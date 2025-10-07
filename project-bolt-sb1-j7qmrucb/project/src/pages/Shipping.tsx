import { UnifiedBackground } from '../components/UnifiedBackground';
import { Truck, Package, Clock, MapPin, Globe, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Shipping() {
  useEffect(() => {
    return setupGlassEffects();
  }, []);

  const shippingOptions = [
    {
      icon: Truck,
      title: 'Standard Shipping',
      time: '5-7 Business Days',
      price: 'FREE on orders over $50',
      description: 'Reliable delivery to your doorstep'
    },
    {
      icon: Package,
      title: 'Express Shipping',
      time: '2-3 Business Days',
      price: '$15',
      description: 'Faster delivery for urgent orders'
    },
    {
      icon: Clock,
      title: 'Next Day Delivery',
      time: '1 Business Day',
      price: '$30',
      description: 'Get it tomorrow when ordered by 2pm'
    }
  ];

  const domesticRegions = [
    { region: 'Contiguous United States', time: '5-7 days', cost: 'FREE over $50' },
    { region: 'Alaska & Hawaii', time: '7-10 days', cost: '$25' },
    { region: 'Puerto Rico & US Territories', time: '10-14 days', cost: '$35' }
  ];

  const internationalRegions = [
    { region: 'Canada', time: '7-14 days', cost: '$20' },
    { region: 'United Kingdom & Europe', time: '10-21 days', cost: '$40' },
    { region: 'Australia & New Zealand', time: '14-28 days', cost: '$50' },
    { region: 'Asia Pacific', time: '14-28 days', cost: '$45' },
    { region: 'Latin America', time: '14-28 days', cost: '$45' }
  ];

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Shipping
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Shipping
              <br />
              <span className="italic font-serif text-orange-600">Information</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Fast, reliable shipping to get your EverPaw products to you quickly and safely.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className="glass-strong glass-hover rounded-2xl p-8 border border-white/20 relative overflow-visible group transition-all duration-300"
              >
                <div className="relative text-center">
                  <option.icon className="w-16 h-16 text-orange-400 mb-4 mx-auto" />
                  <h3 className="text-2xl font-semibold text-white mb-2">{option.title}</h3>
                  <div className="text-orange-400 text-xl font-bold mb-2">{option.time}</div>
                  <div className="text-white/80 text-lg mb-3">{option.price}</div>
                  <p className="text-white/60 text-sm">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="relative">
                <MapPin className="w-12 h-12 text-orange-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">Domestic Shipping</h2>
                <div className="space-y-4">
                  {domesticRegions.map((region, index) => (
                    <div key={index} className="glass-badge glass-hover rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{region.region}</h3>
                        <span className="text-orange-400 font-bold">{region.cost}</span>
                      </div>
                      <div className="flex items-center text-sm text-white/60">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{region.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="relative">
                <Globe className="w-12 h-12 text-orange-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">International Shipping</h2>
                <div className="space-y-4">
                  {internationalRegions.map((region, index) => (
                    <div key={index} className="glass-badge glass-hover rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{region.region}</h3>
                        <span className="text-orange-400 font-bold">{region.cost}</span>
                      </div>
                      <div className="flex items-center text-sm text-white/60">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{region.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12 relative overflow-visible group">
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-8">Shipping Policies & Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start space-x-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Order Processing</h3>
                      <p className="text-white/70">
                        Orders are processed within 1-2 business days. You'll receive a tracking number
                        via email once your order ships.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Package Tracking</h3>
                      <p className="text-white/70">
                        Track your order in real-time using the tracking number provided in your
                        shipping confirmation email.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Signature Required</h3>
                      <p className="text-white/70">
                        For security, orders over $500 require a signature upon delivery. Someone must
                        be present to receive the package.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start space-x-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Customs & Duties</h3>
                      <p className="text-white/70">
                        International customers are responsible for any customs duties, taxes, or fees
                        charged by their country.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Shipping Protection</h3>
                      <p className="text-white/70">
                        All packages are insured. If your package is lost or damaged in transit, we'll
                        replace it at no cost to you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">P.O. Boxes</h3>
                      <p className="text-white/70">
                        We can ship to P.O. boxes using USPS. However, Express and Next Day options
                        require a physical address.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 text-center relative overflow-visible group">
            <div className="relative">
              <Package className="w-16 h-16 text-orange-400 mb-6 mx-auto" />
              <h2 className="text-3xl font-bold text-white mb-4">Questions About Shipping?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Our customer service team is here to help with any shipping-related questions or concerns.
              </p>
              <button className="px-10 py-4 glass-badge glass-hover border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
