import { UnifiedBackground } from '../components/UnifiedBackground';
import { Newspaper, Download, Mail, Award, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';
import { setupGlassEffects } from '../utils/glassEffects';

export default function Press() {
  useEffect(() => {
    return setupGlassEffects();
  }, []);

  const pressReleases = [
    {
      date: 'October 1, 2025',
      title: 'EverPaw Raises $50M Series B to Expand AI-Powered Pet Care Platform',
      excerpt: 'Leading pet tech company secures major funding to accelerate product development and global expansion.',
      category: 'Funding'
    },
    {
      date: 'September 15, 2025',
      title: 'EverPaw Launches Revolutionary Health Monitoring Collar',
      excerpt: 'New smart collar provides real-time health insights and early disease detection for dogs and cats.',
      category: 'Product Launch'
    },
    {
      date: 'August 20, 2025',
      title: 'EverPaw Partners with Leading Veterinary Hospitals',
      excerpt: 'Strategic partnerships bring veterinary expertise directly into the EverPaw ecosystem.',
      category: 'Partnership'
    },
    {
      date: 'July 10, 2025',
      title: 'Study Shows EverPaw Devices Reduce Pet Emergency Visits by 40%',
      excerpt: 'Independent research validates the effectiveness of EverPaw\'s predictive health monitoring.',
      category: 'Research'
    }
  ];

  const awards = [
    { year: '2025', title: 'Best Pet Tech Innovation', organization: 'Tech Innovation Awards' },
    { year: '2025', title: 'Top IoT Company', organization: 'IoT World Congress' },
    { year: '2024', title: 'Startup of the Year', organization: 'Pet Industry Awards' }
  ];

  const stats = [
    { icon: Users, value: '2M+', label: 'Active Users' },
    { icon: TrendingUp, value: '500M+', label: 'Data Points Collected' },
    { icon: Award, value: '15+', label: 'Industry Awards' }
  ];

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 glass-badge border border-white/20 glass-hover rounded-full text-xs tracking-widest text-white uppercase inline-block mb-8">
              Newsroom
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-white tracking-tight mb-8">
              Press &
              <br />
              <span className="italic font-serif text-orange-600">Media</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              The latest news, press releases, and media resources from EverPaw.
              For media inquiries, please contact our press team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-strong glass-hover rounded-2xl p-8 border border-white/20 relative overflow-visible group text-center transition-all duration-300"
              >
                <div className="relative">
                  <stat.icon className="w-12 h-12 text-orange-400 mb-4 mx-auto" />
                  <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 mb-12">
            <div className="flex items-center space-x-3 mb-8">
              <Newspaper className="w-8 h-8 text-orange-400" />
              <h2 className="text-4xl font-bold text-white">Recent Press Releases</h2>
            </div>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div
                  key={index}
                  className="glass-badge glass-hover rounded-2xl p-8 border border-white/20 relative overflow-visible group transition-all duration-300 hover:border-orange-500/30"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-white/60">{release.date}</span>
                        <span className="px-3 py-1 glass-badge border border-orange-500/30 rounded-full text-xs text-orange-400">
                          {release.category}
                        </span>
                      </div>
                      <button className="flex items-center space-x-2 text-white/70 hover:text-orange-400 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{release.title}</h3>
                    <p className="text-white/70 mb-4">{release.excerpt}</p>
                    <button className="text-orange-400 hover:text-orange-300 transition-colors font-medium">
                      Read Full Release →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="relative">
                <Award className="w-12 h-12 text-orange-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">Awards & Recognition</h2>
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <div key={index} className="glass-badge glass-hover rounded-xl p-4 border border-white/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{award.title}</h3>
                          <p className="text-sm text-white/60">{award.organization}</p>
                        </div>
                        <span className="text-orange-400 font-bold">{award.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-strong glass-hover rounded-3xl p-10 border border-white/20 relative overflow-visible group">
              <div className="relative">
                <Download className="w-12 h-12 text-orange-400 mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">Media Kit</h2>
                <p className="text-white/70 mb-8">
                  Download our complete media kit including logos, product images, executive photos,
                  and company information.
                </p>
                <div className="space-y-4">
                  <button className="w-full px-6 py-4 glass-badge glass-hover border border-white/20 rounded-xl text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button flex items-center justify-between group">
                    <span>Logo Package (PNG, SVG)</span>
                    <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                  <button className="w-full px-6 py-4 glass-badge glass-hover border border-white/20 rounded-xl text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button flex items-center justify-between group">
                    <span>Product Images (High-Res)</span>
                    <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                  <button className="w-full px-6 py-4 glass-badge glass-hover border border-white/20 rounded-xl text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button flex items-center justify-between group">
                    <span>Brand Guidelines (PDF)</span>
                    <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong glass-hover rounded-3xl p-12 border border-white/20 text-center relative overflow-visible group">
            <div className="relative">
              <Mail className="w-16 h-16 text-orange-400 mb-6 mx-auto" />
              <h2 className="text-3xl font-bold text-white mb-4">Media Inquiries</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                For press inquiries, interview requests, or additional information, please contact our media relations team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:press@everpaw.com" className="px-10 py-4 glass-badge glass-hover border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                  press@everpaw.com
                </a>
                <a href="tel:+15551234567" className="px-10 py-4 glass-badge glass-hover border border-white/20 rounded-full text-white hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 fluent-button">
                  (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
