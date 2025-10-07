import { UnifiedBackground } from '../components/UnifiedBackground';
import { HelpCircle, Search, BookOpen, MessageCircle, Shield, Settings, Smartphone, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { setupGlassEffects } from '../utils/glassEffects';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    return setupGlassEffects();
  }, []);

  const categories = [
    { icon: Smartphone, title: 'Getting Started', description: 'Setup guides and tutorials' },
    { icon: Settings, title: 'Device Setup', description: 'Configure your EverPaw devices' },
    { icon: Shield, title: 'Account & Security', description: 'Manage your account settings' },
    { icon: CreditCard, title: 'Billing & Plans', description: 'Subscription and payment info' },
    { icon: BookOpen, title: 'Troubleshooting', description: 'Fix common issues' },
    { icon: MessageCircle, title: 'Contact Support', description: 'Get help from our team' }
  ];

  const faqs = [
    {
      question: 'How do I set up my EverPaw device?',
      answer: 'Setting up your EverPaw device is easy! Download the EverPaw app, create an account, and follow the in-app setup wizard. Make sure your device is charged and your phone has Bluetooth enabled. The app will guide you through pairing your device and configuring your pet\'s profile.'
    },
    {
      question: 'What should I do if my device won\'t connect?',
      answer: 'First, ensure your device is charged and within Bluetooth range (about 30 feet). Try restarting both your phone and the device. If the issue persists, reset the device by holding the power button for 10 seconds until the LED flashes. Then try pairing again through the app.'
    },
    {
      question: 'How accurate is the health monitoring?',
      answer: 'EverPaw devices use veterinary-grade sensors with 95%+ accuracy for heart rate, activity levels, and temperature monitoring. However, our devices are designed to complement, not replace, regular veterinary care. Always consult your vet for medical concerns.'
    },
    {
      question: 'Can I use one account for multiple pets?',
      answer: 'Yes! You can add unlimited pet profiles to your EverPaw account. Each pet can have their own device, health data, and activity tracking. Switch between pets easily in the app to view individual insights and history.'
    },
    {
      question: 'What\'s included in my subscription?',
      answer: 'Your subscription includes unlimited cloud storage for health data, real-time alerts, AI-powered health insights, activity tracking, and access to our 24/7 support team. Premium plans also include video storage, advanced analytics, and veterinary consultations.'
    },
    {
      question: 'How long does the battery last?',
      answer: 'Battery life varies by device and usage. Our smart collars typically last 5-7 days on a single charge with normal use. The charging base station makes it easy to charge overnight. The app will notify you when battery is low.'
    },
    {
      question: 'Is my pet\'s data secure?',
      answer: 'Absolutely! We use bank-level encryption (AES-256) to protect all data. Your pet\'s information is stored securely in the cloud and is never shared with third parties without your explicit consent. You have full control over your data and can delete it at any time.'
    },
    {
      question: 'What if my device breaks or malfunctions?',
      answer: 'All EverPaw devices come with a 1-year warranty covering manufacturing defects. If your device malfunctions, contact our support team for a free replacement. We also offer optional protection plans for accidental damage coverage.'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Support
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Help
              <br />
              <span className="italic font-serif text-orange-600">Center</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
              Find answers to common questions and get help with your EverPaw products.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="glass-strong glass-hover border border-white/20 rounded-2xl relative overflow-visible group">
                <div className="flex items-center px-6 py-4">
                  <Search className="w-5 h-5 text-orange-400 mr-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for help articles..."
                    className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {categories.map((category, index) => (
              <div
                key={index}
                className="glass-strong glass-hover rounded-2xl p-8 border border-white/20 relative overflow-visible group transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <category.icon className="w-12 h-12 text-orange-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-white/70 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-12 text-center tracking-tight">
              Frequently Asked <span className="italic font-serif text-orange-600">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-strong border border-white/20 glass-hover rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg text-white font-medium">{faq.question}</span>
                    <div className={`text-orange-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
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

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 text-center relative overflow-visible group">
            <div className="relative">
              <MessageCircle className="w-16 h-16 text-orange-400 mb-6 mx-auto" />
              <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Our support team is available 24/7 to assist you with any questions or issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 glass-badge glass-hover border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                  Start Live Chat
                </button>
                <button className="px-10 py-4 glass-badge glass-hover border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                  Email Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
