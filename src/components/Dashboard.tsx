import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HabitCard } from "./HabitCard";
import { 
  Plus, 
  Flame, 
  Trophy, 
  Users, 
  Calendar,
  Bell,
  Settings,
  Target,
  Star,
  TrendingUp
} from "lucide-react";
import dashboardBg from "@/assets/dashboard-bg.jpg";

interface DashboardProps {
  onCreateHabit: () => void;
  onHabitClick: (habitId: string) => void;
}

// Mock data - in real app this would come from API
const mockHabits = [
  {
    id: "1",
    name: "Morning Workout",
    streak: 12,
    todayCompleted: false,
    weekProgress: 85,
    chainMembers: 5,
    category: "fitness",
    points: 120,
    nextReminder: "7:00 AM"
  },
  {
    id: "2", 
    name: "Read 30 Minutes",
    streak: 25,
    todayCompleted: true,
    weekProgress: 100,
    chainMembers: 8,
    category: "learning",
    points: 250,
    nextReminder: "8:00 PM"
  },
  {
    id: "3",
    name: "Meditation",
    streak: 7,
    todayCompleted: false,
    weekProgress: 71,
    chainMembers: 3,
    category: "mindfulness",
    points: 75,
    nextReminder: "6:30 AM"
  }
];

const mockStats = {
  totalStreak: 44,
  weeklyPoints: 445,
  rank: 23,
  completedToday: 1,
  totalHabits: 3
};

export function Dashboard({ onCreateHabit, onHabitClick }: DashboardProps) {
  const [habits, setHabits] = useState(mockHabits);

  const handleCompleteHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { ...habit, todayCompleted: true, streak: habit.streak + 1, points: habit.points + 10 }
        : habit
    ));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning! 🌅";
    if (hour < 17) return "Good Afternoon! ☀️";
    return "Good Evening! 🌙";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Image */}
      <div 
        className="fixed inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />
      
      {/* Header */}
      <div className="relative z-10 bg-gradient-hero text-white">
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{getGreeting()}</h1>
              <p className="text-white/80">Keep building your chains! 🔗</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="floating" size="icon-sm">
                <Bell className="w-4 h-4" />
              </Button>
              
              <Button variant="floating" size="icon-sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-4 h-4 text-warning" />
                <span className="text-xl font-bold">{mockStats.totalStreak}</span>
              </div>
              <span className="text-xs text-white/70">Total Streak</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 text-gold" />
                <span className="text-xl font-bold">{mockStats.weeklyPoints}</span>
              </div>
              <span className="text-xs text-white/70">Weekly Points</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="w-4 h-4 text-gold" />
                <span className="text-xl font-bold">#{mockStats.rank}</span>
              </div>
              <span className="text-xs text-white/70">Leaderboard</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-success" />
                <span className="text-xl font-bold">{mockStats.completedToday}/{mockStats.totalHabits}</span>
              </div>
              <span className="text-xs text-white/70">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button 
            onClick={onCreateHabit}
            variant="hero" 
            size="lg"
            className="flex-1"
          >
            <Plus className="w-5 h-5" />
            <span>Create Habit</span>
          </Button>
          
          <Button variant="soft" size="lg">
            <Users className="w-5 h-5" />
            <span>Join Chain</span>
          </Button>
        </div>

        {/* Today's Habits Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Today's Habits</h2>
            <Badge variant="secondary" className="bg-primary-light/20 text-primary">
              {habits.filter(h => !h.todayCompleted).length} pending
            </Badge>
          </div>

          <div className="space-y-4">
            {habits.map((habit) => (
              <div 
                key={habit.id}
                onClick={() => onHabitClick(habit.id)}
                className="cursor-pointer"
              >
                <HabitCard 
                  habit={habit} 
                  onComplete={handleCompleteHabit}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Card */}
        <Card className="p-6 bg-gradient-soft border-0 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary mb-1">You're on fire! 🔥</h3>
              <p className="text-sm text-primary/80">
                You've completed 85% of your habits this week. Keep it up!
              </p>
            </div>
          </div>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}