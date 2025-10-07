import { UnifiedBackground } from '../components/UnifiedBackground';
import { Briefcase, Heart, Zap, Users, MapPin, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Careers() {
  useEffect(() => {
    return setupGlassEffects();
  }, []);

  const jobListings = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Build cutting-edge AI-powered solutions for pet care technology.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create beautiful, intuitive experiences for pet owners worldwide.'
    },
    {
      title: 'Machine Learning Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Develop AI models for pet behavior analysis and health monitoring.'
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead marketing initiatives and grow our brand presence globally.'
    },
    {
      title: 'Customer Success Lead',
      department: 'Support',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Ensure our customers have amazing experiences with EverPaw products.'
    },
    {
      title: 'Hardware Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Design and develop innovative IoT devices for smart pet care.'
    }
  ];

  const benefits = [
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health, dental, and vision coverage' },
    { icon: DollarSign, title: 'Competitive Salary', description: 'Industry-leading compensation and equity packages' },
    { icon: Clock, title: 'Flexible Schedule', description: 'Work-life balance with flexible hours and remote options' },
    { icon: TrendingUp, title: 'Growth Opportunities', description: 'Continuous learning and career development programs' },
    { icon: Users, title: 'Amazing Team', description: 'Collaborative culture with passionate pet lovers' },
    { icon: Zap, title: 'Latest Technology', description: 'Work with cutting-edge tools and technologies' }
  ];

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Careers
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Join Our
              <br />
              <span className="italic font-serif text-orange-600">Pack</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Help us revolutionize pet care with technology. We're building the future of pet ownership,
              and we're looking for talented, passionate people to join our mission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass-strong glass-hover rounded-2xl p-8 border border-white/20 relative overflow-visible group transition-all duration-300"
              >
                <benefit.icon className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/70">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12">
            <div className="flex items-center space-x-3 mb-8">
              <Briefcase className="w-8 h-8 text-orange-400" />
              <h2 className="text-4xl font-bold text-white">Open Positions</h2>
            </div>

            <div className="space-y-6">
              {jobListings.map((job, index) => (
                <div
                  key={index}
                  className="glass-badge glass-hover rounded-2xl p-8 border border-white/20 relative overflow-visible group transition-all duration-300 hover:border-orange-500/30"
                >
                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{job.title}</h3>
                        <p className="text-orange-400 font-medium">{job.department}</p>
                      </div>
                      <button className="mt-4 md:mt-0 px-8 py-3 glass-badge glass-hover border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                        Apply Now
                      </button>
                    </div>
                    <p className="text-white/70 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 text-center relative overflow-visible group">
            <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and tell us how you can
              contribute to EverPaw's mission.
            </p>
            <button className="px-10 py-4 glass-badge glass-hover border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 text-lg font-medium fluent-button">
              Send General Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
