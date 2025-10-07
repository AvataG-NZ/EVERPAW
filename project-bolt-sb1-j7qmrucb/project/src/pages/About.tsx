import { Target, Lightbulb, Rocket, Linkedin, Twitter } from 'lucide-react';
import { useEffect } from 'react';

export function About() {
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

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Co-Founder & CEO',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former veterinary technician with 10+ years experience'
    },
    {
      name: 'Marcus Johnson',
      role: 'Co-Founder & CTO',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'AI researcher and pet tech innovator'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Chief Veterinarian',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Board-certified veterinarian specializing in preventive care'
    },
    {
      name: 'James Park',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Product leader from leading tech companies'
    }
  ];

  const partners = [
    { name: 'American Veterinary Association', type: 'Partner' },
    { name: 'Pet Health Alliance', type: 'Partner' },
    { name: 'Global Animal Wellness Fund', type: 'Investor' }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 bg-gradient-to-b from-black/30 via-transparent to-black/30">
      <section className="relative pt-48 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />

        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Our Mission
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Empowering Pet Parents with
              <br />
              <span className="italic font-serif text-orange-600">Smart Technology</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              We believe every pet deserves the best care possible. That's why we're building the future of pet wellness through innovative technology and veterinary expertise.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12 mb-32">
            <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 text-center bg-gradient-to-br from-orange-500/5 to-amber-500/5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">The Problem</h3>
              <p className="text-white/80 leading-relaxed">
                Pet owners struggle to monitor their pet's health between vet visits. Warning signs are often missed, leading to preventable health issues and expensive emergency care.
              </p>
            </div>

            <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 text-center bg-gradient-to-br from-orange-500/5 to-amber-500/5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">The Insight</h3>
              <p className="text-white/80 leading-relaxed">
                Continuous health monitoring combined with AI analysis can detect issues early. Real-time data empowers pet owners to take proactive action and provides vets with valuable insights.
              </p>
            </div>

            <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 text-center bg-gradient-to-br from-orange-500/5 to-amber-500/5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">The Solution</h3>
              <p className="text-white/80 leading-relaxed">
                EverPaw combines smart collar technology with AI-powered insights, giving pet owners a complete wellness platform that monitors, alerts, and guides them toward better pet care.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
              Meet Our <span className="italic font-serif text-orange-600">Team</span>
            </h2>
            <p className="text-white/90 text-lg">Passionate experts dedicated to advancing pet wellness</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {team.map((member) => (
              <div key={member.name} className="glass-strong border border-white/20 glass-hover rounded-3xl overflow-hidden group">
                <div className="aspect-square overflow-hidden rounded-t-3xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-orange-500 mb-3">{member.role}</p>
                    <p className="text-sm text-white/70 leading-relaxed">{member.bio}</p>
                  </div>
                  <div className="flex items-center space-x-3 pt-2">
                    <button className="w-10 h-10 glass-badge border border-white/20 glass-hover rounded-xl flex items-center justify-center hover:border-orange-500/40 transition-colors">
                      <Linkedin className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-10 h-10 glass-badge border border-white/20 glass-hover rounded-xl flex items-center justify-center hover:border-orange-500/40 transition-colors">
                      <Twitter className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-strong border border-white/20 glass-hover rounded-[3rem] p-12 lg:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-4 tracking-tight">
                Trusted <span className="italic font-serif text-orange-600">Partners</span>
              </h2>
              <p className="text-white/90">Working with leading organizations in pet health and wellness</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <div key={partner.name} className="glass-badge border border-white/20 glass-hover rounded-2xl p-8 text-center">
                  <div className="text-sm text-orange-500 mb-2 tracking-wide">{partner.type}</div>
                  <div className="text-lg font-medium text-white">{partner.name}</div>
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
