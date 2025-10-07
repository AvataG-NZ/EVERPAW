import { Activity, Shield, MessageCircle, Target, Mic } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { setFeatureSection } from '../components/UnifiedBackground';

interface FeatureContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: React.ReactNode | null;
  extraSections?: React.ReactNode;
}

export function Features() {
  const location = useLocation();
  const initialSection = (location.state as { section?: string })?.section || 'health';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [scrolled, setScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [heartRate, setHeartRate] = useState(0);
  const [steps, setSteps] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(0);
  const [calories, setCalories] = useState(0);
  const hasAnimatedMetricsRef = useRef(false);

  useEffect(() => {
    setFeatureSection(initialSection);
    setActiveSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && !visibleSections.has(sectionId)) {
            setVisibleSections(prev => new Set(prev).add(sectionId));

            if (sectionId === 'health-metrics' && !hasAnimatedMetricsRef.current) {
              hasAnimatedMetricsRef.current = true;
              const duration = 5000;
              const startTime = Date.now();

              const heartRateTarget = 72;
              const stepsTarget = 8200;
              const sleepQualityTarget = 94;
              const caloriesTarget = 420;

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOutQuad = (t: number) => t * (2 - t);
                const easedProgress = easeOutQuad(progress);

                setHeartRate(Math.floor(easedProgress * heartRateTarget));
                setSteps(Math.floor(easedProgress * stepsTarget));
                setSleepQuality(Math.floor(easedProgress * sleepQualityTarget));
                setCalories(Math.floor(easedProgress * caloriesTarget));

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setHeartRate(heartRateTarget);
                  setSteps(stepsTarget);
                  setSleepQuality(sleepQualityTarget);
                  setCalories(caloriesTarget);
                }
              };

              requestAnimationFrame(animate);
            }
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const buttonContainer = document.querySelector('.feature-buttons-container');
    if (!buttonContainer) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      buttonContainer.classList.add('cursor-grabbing');
      startX = e.pageX - buttonContainer.getBoundingClientRect().left;
      scrollLeft = buttonContainer.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      buttonContainer.classList.remove('cursor-grabbing');
    };

    const handleMouseUp = () => {
      isDown = false;
      buttonContainer.classList.remove('cursor-grabbing');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - buttonContainer.getBoundingClientRect().left;
      const walk = (x - startX) * 2;
      buttonContainer.scrollLeft = scrollLeft - walk;
    };

    buttonContainer.addEventListener('mousedown', handleMouseDown);
    buttonContainer.addEventListener('mouseleave', handleMouseLeave);
    buttonContainer.addEventListener('mouseup', handleMouseUp);
    buttonContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      buttonContainer.removeEventListener('mousedown', handleMouseDown);
      buttonContainer.removeEventListener('mouseleave', handleMouseLeave);
      buttonContainer.removeEventListener('mouseup', handleMouseUp);
      buttonContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.glass-hover');
    const buttons = document.querySelectorAll('.fluent-button');
    const featureBar = document.querySelector('.feature-bar');

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

    if (featureBar) {
      featureBar.addEventListener('mousemove', handleButtonMouseMove as EventListener);
    }

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleCardMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
      buttons.forEach((button) => {
        button.removeEventListener('mousemove', handleButtonMouseMove as EventListener);
      });
      if (featureBar) {
        featureBar.removeEventListener('mousemove', handleButtonMouseMove as EventListener);
      }
    };
  }, [activeSection, isTransitioning]);

  const features = [
    { id: 'health', name: 'Health', icon: Activity },
    { id: 'safety', name: 'Safety', icon: Shield },
    { id: 'avatar', name: 'Avatar', icon: MessageCircle },
    { id: 'training', name: 'Training', icon: Target },
    { id: 'ai-voice', name: 'AI Voice', icon: Mic }
  ];

  const featureContent: { [key: string]: FeatureContent } = {
    health: {
      id: 'health',
      title: 'Real-time',
      subtitle: 'Health',
      description: 'Our advanced biometric sensors track heart rate, activity levels, sleep patterns, and more. Get instant insights into your pet\'s wellbeing with our comprehensive health score.',
      details: ['Heart Rate Monitor', 'Activity Tracking', 'Sleep Quality Analysis', 'Calorie Burn Counter'],
      image: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-white/20 glass-hover flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-light text-white mb-2">92</div>
                <div className="text-sm text-white/70 tracking-wide">Health Score</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 glass-strong border border-white/20 glass-hover rounded-2xl flex items-center justify-center">
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      ),
      extraSections: (
        <div className="space-y-8">
          <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-8">
            <h3 className="text-2xl font-light text-white mb-4">Advanced Monitoring</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-sm text-orange-500 font-medium tracking-wide">Continuous Tracking</div>
                <p className="text-white/70 text-sm leading-relaxed">24/7 biometric monitoring with real-time alerts for abnormal heart rate, irregular breathing patterns, or sudden activity changes.</p>
              </div>
              <div className="space-y-3">
                <div className="text-sm text-orange-500 font-medium tracking-wide">AI Health Insights</div>
                <p className="text-white/70 text-sm leading-relaxed">Machine learning analyzes patterns to predict potential health issues before they become serious, giving you peace of mind.</p>
              </div>
            </div>
          </div>
          <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-8" data-section="health-metrics">
            <h3 className="text-2xl font-light text-white mb-6">Health Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Heart Rate', value: heartRate, unit: 'BPM', format: (v: number) => v.toString() },
                { label: 'Steps Today', value: steps, unit: 'steps', format: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString() },
                { label: 'Sleep Quality', value: sleepQuality, unit: 'quality', format: (v: number) => `${v}%` },
                { label: 'Calories', value: calories, unit: 'kcal', format: (v: number) => v.toString() }
              ].map((metric, index) => (
                <div
                  key={metric.label}
                  className={`glass-badge border border-white/20 glass-hover rounded-2xl p-4 text-center transition-all duration-700 ${visibleSections.has('health-metrics') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{transitionDelay: visibleSections.has('health-metrics') ? `${index * 0.15}s` : '0s'}}
                >
                  <div className="text-2xl font-light text-white mb-1 tabular-nums">{metric.format(metric.value)}</div>
                  <div className="text-xs text-white/50 mb-1">{metric.unit}</div>
                  <div className="text-xs text-white/70">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    safety: {
      id: 'safety',
      title: 'Safety &',
      subtitle: 'Geofencing',
      description: 'Create custom safe zones and receive instant alerts if your pet wanders too far. Live GPS tracking ensures you always know where your companion is.',
      details: ['GPS Tracking', 'Custom Safe Zones', 'Instant Alerts', 'Location History'],
      image: (
        <div className="relative w-full h-full flex items-center justify-center">
        </div>
      ),
      extraSections: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-8">
              <h3 className="text-2xl font-light text-white mb-4">Precision Tracking</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-white/20 glass-hover flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Real-time Updates</div>
                    <p className="text-white/60 text-sm">GPS location refreshes every 2-5 seconds when your pet is on the move</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-white/20 glass-hover flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Multi-Zone Support</div>
                    <p className="text-white/60 text-sm">Create unlimited safe zones with custom radiuses from 50ft to 2 miles</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-8">
              <h3 className="text-2xl font-light text-white mb-4">Smart Alerts</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-white/20 glass-hover flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Instant Notifications</div>
                    <p className="text-white/60 text-sm">Get push alerts within seconds when boundaries are crossed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-white/20 glass-hover flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Family Sharing</div>
                    <p className="text-white/60 text-sm">Share live tracking with up to 10 family members simultaneously</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    avatar: {
      id: 'avatar',
      title: 'AI-Powered',
      subtitle: 'Avatar',
      description: 'Chat with your pet\'s personal AI companion. Get training tips, health advice, and answers to all your pet care questions in real-time.',
      details: ['Personalized Advice', 'Voice Interaction', '24/7 Available', 'Expert Knowledge'],
      image: (
        <div className="space-y-6 max-w-md">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 glass-hover border border-white/20">
              <MessageCircle className="w-6 h-6 text-orange-500" />
            </div>
            <div className="glass-badge border border-white/20 glass-hover rounded-2xl p-4 flex-1">
              <p className="text-sm text-white/90">"How should I train Max to sit?"</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 flex-row-reverse">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center flex-shrink-0 fluent-button">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div className="glass-strong border border-orange-500/30 glass-hover rounded-2xl p-4 flex-1">
              <p className="text-sm text-white">Start with short sessions using treats as rewards...</p>
            </div>
          </div>
        </div>
      )
    },
    training: {
      id: 'training',
      title: 'Training &',
      subtitle: 'Progress',
      description: 'Track your training journey with streaks, milestones, and personalized coaching plans. Our AI analyzes your pet\'s learning patterns and adapts.',
      details: ['Daily Streaks', 'Skills Tracking', 'Progress Milestones', 'Custom Training Plans'],
      image: (
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Day Streak', value: '14', color: 'from-orange-500/20 to-amber-500/20' },
            { label: 'Skills Learned', value: '8', color: 'from-amber-500/20 to-orange-500/20' },
            { label: 'Training Hours', value: '24', color: 'from-orange-400/20 to-amber-400/20' }
          ].map((stat) => (
            <div key={stat.label} className={`glass-badge border border-white/20 glass-hover rounded-3xl p-6 text-center bg-gradient-to-br ${stat.color}`}>
              <div className="text-4xl font-light text-white mb-2">{stat.value}</div>
              <div className="text-xs text-white/70 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      ),
      extraSections: (
        <div className="space-y-8">
          <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-8">
            <h3 className="text-2xl font-light text-white mb-6">Training Programs</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Basic Commands', level: 'Beginner', lessons: 12 },
                { title: 'Advanced Tricks', level: 'Intermediate', lessons: 18 },
                { title: 'Behavioral Training', level: 'Expert', lessons: 24 }
              ].map((program) => (
                <div key={program.title} className="glass-badge border border-white/20 glass-hover rounded-2xl p-6 hover:border-orange-500/50 transition-all cursor-pointer">
                  <div className="text-xs text-orange-500 font-medium mb-2">{program.level}</div>
                  <div className="text-white font-medium mb-2">{program.title}</div>
                  <div className="text-white/60 text-sm">{program.lessons} Lessons</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-8">
            <h3 className="text-2xl font-light text-white mb-4">Achievement System</h3>
            <p className="text-white/70 mb-6">Unlock badges and rewards as you progress through training milestones with your pet</p>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'First Week', icon: '🎯' },
                { name: 'Master Trainer', icon: '⭐' },
                { name: '30 Day Streak', icon: '🔥' },
                { name: 'All Skills', icon: '🏆' },
                { name: 'Perfect Session', icon: '💫' },
                { name: 'Quick Learner', icon: '⚡' }
              ].map((badge) => (
                <div key={badge.name} className="glass-badge border border-white/20 glass-hover rounded-xl px-4 py-3 flex items-center space-x-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-sm text-white/70">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    'ai-voice': {
      id: 'ai-voice',
      title: 'Voice',
      subtitle: 'Commands',
      description: 'Control your pet\'s collar and get instant updates using just your voice. Seamlessly integrated with Alexa, Google Assistant, and Siri.',
      details: ['Hands-Free Control', 'Multi-Platform Support', 'Custom Voice Commands', 'Instant Status Updates'],
      image: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-white/10 glass-hover flex items-center justify-center relative">
              <Mic className="w-20 h-20 text-orange-500" />
              <div className="absolute inset-0 rounded-full border-4 border-orange-500/30 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-4 rounded-full border-4 border-orange-500/20 animate-ping pointer-events-none" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>
      ),
      extraSections: (
        <div className="space-y-8">
          <div className="glass-strong border border-white/20 glass-hover rounded-3xl p-8">
            <h3 className="text-2xl font-light text-white mb-6">Voice Commands</h3>
            <div className="space-y-4">
              {[
                { command: 'Where is Max?', response: 'Max is at home in the living room' },
                { command: 'How is Luna\'s health?', response: 'Luna\'s health score is 94. All vitals normal.' },
                { command: 'Start training session', response: 'Training session started. Good luck!' }
              ].map((item) => (
                <div key={item.command} className="glass-badge border border-white/20 glass-hover rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mic className="w-5 h-5 text-orange-500" />
                    <div className="text-white">"{item.command}"</div>
                  </div>
                  <div className="pl-8 text-white/60 text-sm italic">{item.response}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { platform: 'Amazon Alexa', status: 'Integrated' },
              { platform: 'Google Assistant', status: 'Integrated' },
              { platform: 'Apple Siri', status: 'Integrated' }
            ].map((platform) => (
              <div key={platform.platform} className="glass-strong border border-white/20 glass-hover rounded-3xl p-6 text-center">
                <div className="text-white font-medium mb-2">{platform.platform}</div>
                <div className="text-orange-500 text-sm">{platform.status}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  };

  const handleFeatureChange = (featureId: string) => {
    const featureBar = document.querySelector('.feature-bar') as HTMLElement;
    if (featureBar) {
      const navHeight = 80;
      const heroSection = document.querySelector('section');

      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const targetScrollPosition = heroHeight - navHeight;
        window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
      }
    }

    if (featureId === activeSection) return;

    setIsTransitioning(true);
    setFeatureSection(featureId);
    setTimeout(() => {
      setActiveSection(featureId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const currentFeature = featureContent[activeSection];

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 bg-gradient-to-b from-black/30 via-transparent to-black/30">
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-6 sm:mb-8">
              Complete Platform
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-6 sm:mb-8">
              Everything in
              <br />
              <span className="italic font-serif text-orange-600">One App</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed px-4">
              From health monitoring to AI-powered training, EverPaw brings together all the tools you need to give your pet the best care possible.
            </p>
          </div>
        </div>
      </section>

      <section className={`feature-bar sticky top-20 z-40 transition-all duration-300 ${scrolled ? 'backdrop-blur-xl bg-white/15 shadow-lg' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <div className="feature-buttons-container flex items-center justify-start lg:justify-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 cursor-grab select-none">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureChange(feature.id)}
                className={`flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl transition-all duration-500 whitespace-nowrap fluent-button flex-shrink-0 ${
                  activeSection === feature.id
                    ? 'bg-orange-500 text-white shadow-xl'
                    : 'glass-badge border border-white/20 glass-hover text-white/70 hover:text-white'
                }`}
              >
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">{feature.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">
              <div></div>

              <div className={`space-y-4 sm:space-y-6 transition-all duration-700 delay-100 ${isTransitioning ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'}`}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                  {currentFeature.title} <span className="italic font-serif text-orange-600">{currentFeature.subtitle}</span>
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                  {currentFeature.description}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                  {currentFeature.details.map((detail, index) => (
                    <div
                      key={detail}
                      className={`glass-badge border border-white/20 glass-hover rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-500 hover:border-orange-500/80 hover:bg-orange-500/35`}
                      style={{
                        transitionDelay: `${isTransitioning ? 0 : (index + 2) * 100}ms`,
                        opacity: isTransitioning ? 0 : 1,
                        transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)'
                      }}
                    >
                      <div className="text-xs sm:text-sm text-white/70 mb-1">{detail}</div>
                      <div className="text-xl sm:text-2xl font-light text-white">✓</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {currentFeature.extraSections && (
              <div className={`mt-12 sm:mt-20 transition-all duration-700 delay-200 ${isTransitioning ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
                {currentFeature.extraSections}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="glass-strong border border-white/20 glass-hover rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
              Ready to Get <span className="italic font-serif text-orange-600">Started?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto px-4">
              Join thousands of pet owners who trust EverPaw to keep their companions healthy and happy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500 text-white text-sm tracking-wide hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl font-medium fluent-button hover:bg-orange-600">
                Join Beta
              </button>
              <button className="px-6 py-3 sm:px-8 sm:py-4 glass-strong border border-white/20 glass-hover text-white text-sm tracking-wide transition-all duration-300 rounded-2xl fluent-button">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}