import { Mail, Send, ChevronDown, Building, Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    petType: '',
    petBreed: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.glass-hover');
    const buttons = document.querySelectorAll('.fluent-button');

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

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleCardMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
      buttons.forEach((button) => {
        button.removeEventListener('mousemove', handleButtonMouseMove as EventListener);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            country: formData.country,
            pet_type: formData.petType,
            pet_breed: formData.petBreed,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        country: '',
        petType: '',
        petBreed: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'When will the EverPaw collar be available?',
      answer: 'We\'re currently in beta testing and expect to launch in Q2 2024. Preorder customers will be among the first to receive their collars.'
    },
    {
      question: 'How do I become a beta tester?',
      answer: 'Fill out our contact form expressing interest in beta testing. We\'ll reach out if you\'re selected for our next testing phase.'
    },
    {
      question: 'Do you offer wholesale or partnerships?',
      answer: 'Yes! We work with veterinary clinics, pet stores, and animal welfare organizations. Contact us at partners@everpaw.com for more information.'
    },
    {
      question: 'Where do you ship?',
      answer: 'We currently ship to the US, Canada, UK, and EU. We\'re working on expanding to more countries soon.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach us via email at support@everpaw.com, through our contact form, or via live chat in the app. Our team typically responds within 24 hours.'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 bg-gradient-to-b from-black/30 via-transparent to-black/30">
      <section className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Get in Touch
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Talk to
              <br />
              <span className="italic font-serif text-orange-600">EverPaw</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Have questions? Want to partner with us? We'd love to hear from you. Our team typically responds within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto mb-32">
            <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 lg:p-16">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl glass-badge border border-white/20 glass-hover focus:outline-none focus:border-orange-500/60 text-white placeholder-white/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl glass-badge border border-white/20 glass-hover focus:outline-none focus:border-orange-500/60 text-white placeholder-white/40"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl glass-badge border border-white/20 glass-hover focus:outline-none focus:border-orange-500/60 text-white placeholder-white/40"
                    placeholder="Your country"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Pet Type</label>
                    <select
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl glass-badge border border-white/20 glass-hover focus:outline-none focus:border-orange-500/60 text-white bg-transparent appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-stone-800">Select pet type</option>
                      <option value="dog" className="bg-stone-800">Dog</option>
                      <option value="cat" className="bg-stone-800">Cat</option>
                      <option value="other" className="bg-stone-800">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Breed</label>
                    <input
                      type="text"
                      value={formData.petBreed}
                      onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl glass-badge border border-white/20 glass-hover focus:outline-none focus:border-orange-500/60 text-white placeholder-white/40"
                      placeholder="Breed (optional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl glass-badge border border-white/20 glass-hover focus:outline-none focus:border-orange-500/60 text-white placeholder-white/40 resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="glass-strong border border-green-500/30 rounded-2xl p-4 bg-green-500/10">
                    <p className="text-green-400 text-center">Thank you! We'll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="glass-strong border border-red-500/30 rounded-2xl p-4 bg-red-500/10">
                    <p className="text-red-400 text-center">Oops! Something went wrong. Please try again.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group px-8 py-4 bg-orange-500 text-white text-sm tracking-wide hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl font-medium fluent-button disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 hover:bg-orange-600"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-32">
            <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Partnership Inquiries</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Interested in partnering with EverPaw? We work with veterinary clinics, pet stores, and animal welfare organizations.
              </p>
              <a href="mailto:partners@everpaw.com" className="text-orange-500 hover:text-orange-400 transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>partners@everpaw.com</span>
              </a>
            </div>

            <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-6">
                <Newspaper className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Press & Media</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Media inquiries, press releases, and brand assets. We're happy to help with your story about EverPaw.
              </p>
              <a href="mailto:press@everpaw.com" className="text-orange-500 hover:text-orange-400 transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>press@everpaw.com</span>
              </a>
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
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg text-white font-medium">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/70 transition-transform flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`} />
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
