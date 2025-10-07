import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RewardActivity {
  id: string;
  description: string;
  points: number;
  date: string;
  type: 'earned' | 'redeemed';
  category: 'purchase' | 'activity' | 'milestone' | 'bonus';
  metadata?: {
    milesRan?: number;
    foodAte?: string;
    itemsPurchased?: number;
  };
}

interface RewardsContextType {
  points: number;
  activities: RewardActivity[];
  isOpen: boolean;
  toggleRewards: () => void;
  addPoints: (points: number, description: string) => void;
  redeemPoints: (points: number, description: string) => void;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0);
  const [activities, setActivities] = useState<RewardActivity[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedPoints = localStorage.getItem('rewards_points');
    const savedActivities = localStorage.getItem('rewards_activities');

    if (savedPoints) {
      setPoints(JSON.parse(savedPoints));
    }

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      const initialActivities: RewardActivity[] = [
        {
          id: '1',
          description: 'Morning walk completed',
          points: 150,
          date: new Date().toISOString(),
          type: 'earned',
          category: 'activity',
          metadata: { milesRan: 2.3 }
        },
        {
          id: '2',
          description: 'Daily feeding logged',
          points: 50,
          date: new Date().toISOString(),
          type: 'earned',
          category: 'activity',
          metadata: { foodAte: 'Premium Kibble - 2 cups' }
        },
        {
          id: '3',
          description: 'First purchase reward',
          points: 250,
          date: new Date(Date.now() - 86400000).toISOString(),
          type: 'earned',
          category: 'purchase',
          metadata: { itemsPurchased: 3 }
        },
        {
          id: '4',
          description: 'Weekly activity milestone',
          points: 200,
          date: new Date(Date.now() - 172800000).toISOString(),
          type: 'earned',
          category: 'milestone',
          metadata: { milesRan: 15.8 }
        },
        {
          id: '5',
          description: 'Evening walk completed',
          points: 120,
          date: new Date(Date.now() - 259200000).toISOString(),
          type: 'earned',
          category: 'activity',
          metadata: { milesRan: 1.8 }
        },
        {
          id: '6',
          description: 'Healthy meal logged',
          points: 75,
          date: new Date(Date.now() - 345600000).toISOString(),
          type: 'earned',
          category: 'activity',
          metadata: { foodAte: 'Organic Chicken & Rice' }
        },
        {
          id: '7',
          description: 'Welcome bonus',
          points: 500,
          date: new Date(Date.now() - 432000000).toISOString(),
          type: 'earned',
          category: 'bonus'
        }
      ];
      setActivities(initialActivities);
      setPoints(1345);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rewards_points', JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem('rewards_activities', JSON.stringify(activities));
  }, [activities]);

  const addPoints = (pointsToAdd: number, description: string) => {
    const newActivity: RewardActivity = {
      id: Date.now().toString(),
      description,
      points: pointsToAdd,
      date: new Date().toISOString(),
      type: 'earned'
    };

    setActivities(current => [newActivity, ...current]);
    setPoints(current => current + pointsToAdd);
  };

  const redeemPoints = (pointsToRedeem: number, description: string) => {
    if (pointsToRedeem > points) return;

    const newActivity: RewardActivity = {
      id: Date.now().toString(),
      description,
      points: pointsToRedeem,
      date: new Date().toISOString(),
      type: 'redeemed'
    };

    setActivities(current => [newActivity, ...current]);
    setPoints(current => current - pointsToRedeem);
  };

  const toggleRewards = () => {
    setIsOpen(current => !current);
  };

  return (
    <RewardsContext.Provider
      value={{
        points,
        activities,
        isOpen,
        toggleRewards,
        addPoints,
        redeemPoints,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within RewardsProvider');
  }
  return context;
}
