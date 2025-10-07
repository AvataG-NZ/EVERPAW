import { useEffect, useState } from 'react';
import { Sparkles, Users, Rocket, Gift, MessageSquare, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BetaProgram() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pets: '',
    experience: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll('.beta-card, .benefit-card');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('beta_signups').insert([
        {
          name: formData.name,
          email: formData.email,
          pets: formData.pets,
          experience: formData.experience,
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
      setFormData({ name: '', email: '', pets: '', experience: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Sparkles,
      title: 'Early Access',
      description: 'Be the first to try new features before public release',
    },
    {
      icon: Gift,
      title: 'Exclusive Perks',
      description: 'Receive special discounts and beta-exclusive rewards',
    },
    {
      icon: MessageSquare,
      title: 'Direct Feedback',
      description: 'Shape the future of EverPaw with your valuable input',
    },
    {
      icon: Users,
      title: 'Beta Community',
      description: 'Join an exclusive group of passionate pet parents',
    },
    {
      icon: Rocket,
      title: 'Priority Support',
      description: 'Get dedicated support from our development team',
    },
    {
      icon: TrendingUp,
      title: 'Lifetime Benefits',
      description: 'Keep special pricing when you transition to full release',
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
              Beta Program
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Join the
              <br />
              <span className="italic font-serif text-orange-600">Beta Program</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Help shape the future of pet care technology. Get exclusive early access and special benefits.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="benefit-card glass-strong border border-white/20 rounded-2xl p-8 hover:scale-105 transition-all duration-500"
              >
                <div className="glass-badge border border-orange-500/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="beta-card glass-strong border border-white/20 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-light text-white mb-6 text-center">
              Apply for Beta Access
            </h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="glass-badge border border-orange-500/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Application Submitted!
                </h3>
                <p className="text-white/70 mb-8">
                  Thank you for your interest. We'll review your application and get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="fluent-button glass-strong border border-white/30 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-strong border border-white/20 fluent-input text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-strong border border-white/20 fluent-input text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Tell us about your pets *
                  </label>
                  <textarea
                    required
                    value={formData.pets}
                    onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl glass-strong border border-white/20 fluent-input text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 transition-all resize-none"
                    placeholder="How many pets do you have? What breeds?"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Why do you want to join the beta? *
                  </label>
                  <textarea
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl glass-strong border border-white/20 fluent-input text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 transition-all resize-none"
                    placeholder="Share your interest in pet technology and what you hope to gain..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-medium bg-orange-500 hover:bg-orange-600 text-white border border-orange-500/50 fluent-button transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>

                <p className="text-white/60 text-sm text-center">
                  By applying, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            Beta testing typically runs for 2-3 months. Selected participants will receive an email with next steps within 7 business days.
          </p>
        </div>
        </div>
      </section>
      </div>
    </div>
  );
}
