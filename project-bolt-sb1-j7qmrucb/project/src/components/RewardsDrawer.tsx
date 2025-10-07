import { X, Heart, TrendingUp, Gift, Sparkles, Footprints, UtensilsCrossed, ShoppingCart, Trophy } from 'lucide-react';
import { useRewards } from '../contexts/RewardsContext';
import { useEffect } from 'react';

export default function RewardsDrawer() {
  const { points, activities, isOpen, toggleRewards } = useRewards();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const elements = [
        '.rewards-drawer',
        '.rewards-points-card',
        '.rewards-activity-card',
        '.rewards-earn-card',
        '.rewards-redeem-btn',
        '.rewards-close-btn'
      ];

      elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          (element as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
          (element as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
        }
      });

      document.querySelectorAll('.rewards-activity-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };

    const drawer = document.querySelector('.rewards-drawer');

    if (drawer) {
      drawer.addEventListener('mousemove', updateMousePosition as EventListener);
    }

    return () => {
      if (drawer) {
        drawer.removeEventListener('mousemove', updateMousePosition as EventListener);
      }
    };
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'activity':
        return <Footprints className="w-5 h-5 text-orange-400" />;
      case 'purchase':
        return <ShoppingCart className="w-5 h-5 text-orange-400" />;
      case 'milestone':
        return <Trophy className="w-5 h-5 text-orange-400" />;
      case 'bonus':
        return <Sparkles className="w-5 h-5 text-orange-400" />;
      default:
        return <Heart className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', background: 'rgba(0, 0, 0, 0.2)' }}
        onClick={toggleRewards}
      />

      <div
        className={`rewards-drawer fixed right-0 w-full sm:max-w-md z-40 shadow-2xl transform transition-transform duration-300 ease-in-out glass-strong ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          top: window.innerWidth < 640 ? '64px' : '80px',
          height: window.innerWidth < 640 ? 'calc(100vh - 64px)' : 'calc(100vh - 80px)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '-10px 0 60px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6" style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 fill-orange-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Rewards
              </h2>
            </div>
            <button
              onClick={toggleRewards}
              className="p-1.5 sm:p-2 transition-colors hover:text-orange-400 relative z-20"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          <div className="rewards-points-card glass-strong p-4 sm:p-6 mx-4 sm:mx-6 mt-4 sm:mt-6 rounded-xl sm:rounded-2xl relative overflow-hidden group"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(251, 146, 60, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(249, 115, 22, 0.2)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-xs sm:text-sm font-medium">Your Points</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-pulse" />
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{points.toLocaleString()}</div>
            <div className="text-orange-300 text-xs sm:text-sm font-medium">≈ ${(points / 100).toFixed(2)} in rewards</div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Activity</h3>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="rewards-activity-card glass-strong glass-hover rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-300 relative overflow-hidden group hover:scale-[1.02] hover:border-orange-500/50"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-white/10 group-hover:bg-orange-500/20 transition-colors">
                      {getCategoryIcon(activity.category)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm sm:text-base mb-1">{activity.description}</p>
                      {activity.metadata && (
                        <div className="text-white/60 text-[10px] sm:text-xs space-y-1">
                          {activity.metadata.milesRan && (
                            <div className="flex items-center gap-1">
                              <Footprints className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>{activity.metadata.milesRan} miles</span>
                            </div>
                          )}
                          {activity.metadata.foodAte && (
                            <div className="flex items-center gap-1">
                              <UtensilsCrossed className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>{activity.metadata.foodAte}</span>
                            </div>
                          )}
                          {activity.metadata.itemsPurchased && (
                            <div className="flex items-center gap-1">
                              <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              <span>{activity.metadata.itemsPurchased} items</span>
                            </div>
                          )}
                        </div>
                      )}
                      <p className="text-white/50 text-[10px] sm:text-xs mt-2">{formatDate(activity.date)}</p>
                    </div>
                    <div className={`font-bold text-base sm:text-lg flex-shrink-0 ${
                      activity.type === 'earned' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {activity.type === 'earned' ? '+' : '-'}{activity.points}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4" style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div className="rewards-earn-card glass-strong rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 group hover:scale-[1.02] transition-all duration-300 hover:border-orange-500/50 cursor-pointer"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex-1">
                <p className="text-white font-medium text-xs sm:text-sm">Earn More Points</p>
                <p className="text-white/60 text-[10px] sm:text-xs">Share reviews, refer friends & more</p>
              </div>
            </div>

            <button className="rewards-redeem-btn w-full py-3 sm:py-4 bg-orange-500 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-orange-600 transition-all duration-300 fluent-button hover:scale-105 relative overflow-hidden group" style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)'
            }}>
              Redeem Rewards
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
