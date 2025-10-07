import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
            message: formData.message
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('.fluent-input');

    const handleInputMouseMove = (e: MouseEvent) => {
      const input = e.currentTarget as HTMLElement;
      const rect = input.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      input.style.setProperty('--mouse-x', `${x}%`);
      input.style.setProperty('--mouse-y', `${y}%`);
    };

    inputs.forEach((input) => {
      input.addEventListener('mousemove', handleInputMouseMove as EventListener);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('mousemove', handleInputMouseMove as EventListener);
      });
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 lg:p-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
                Get in <span className="italic font-serif text-orange-600">Touch</span>
              </h2>
              <p className="text-lg text-white/90">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl glass-strong border border-white/20 fluent-input focus:outline-none focus:border-orange-500/60 text-white placeholder-white/60 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl glass-strong border border-white/20 fluent-input focus:outline-none focus:border-orange-500/60 text-white placeholder-white/60 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 rounded-2xl glass-strong border border-white/20 fluent-input focus:outline-none focus:border-orange-500/60 text-white placeholder-white/60 transition-all duration-300 resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-2xl glass-strong border border-green-500/30 bg-green-500/10">
                  <p className="text-green-400 text-center">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl glass-strong border border-red-500/30 bg-red-500/10">
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
      </div>
    </section>
  );
}
