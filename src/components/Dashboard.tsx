import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HabitCard } from "./HabitCard";
import { useHabits } from "@/hooks/useHabits";
import { useAuth } from "@/hooks/useAuth";
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
  TrendingUp,
  LogOut
} from "lucide-react";
import dashboardBg from "@/assets/dashboard-bg.jpg";

interface DashboardProps {
  onCreateHabit: () => void;
  onHabitClick: (habitId: string) => void;
}

export function Dashboard({ onCreateHabit, onHabitClick }: DashboardProps) {
  const { user, logout } = useAuth();
  const { habits, completeHabit } = useHabits(user?.id);

  const handleCompleteHabit = (habitId: string) => {
    completeHabit(habitId);
  };

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const weeklyPoints = habits.reduce((sum, h) => sum + h.points, 0);
  const completedToday = habits.filter(h => h.todayCompleted).length;

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

              <Button variant="floating" size="icon-sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-4 h-4 text-warning" />
                <span className="text-xl font-bold">{totalStreak}</span>
              </div>
              <span className="text-xs text-white/70">Total Streak</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 text-gold" />
                <span className="text-xl font-bold">{weeklyPoints}</span>
              </div>
              <span className="text-xs text-white/70">Weekly Points</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="w-4 h-4 text-gold" />
                <span className="text-xl font-bold">#{habits.length > 0 ? '1' : '-'}</span>
              </div>
              <span className="text-xs text-white/70">Leaderboard</span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-success" />
                <span className="text-xl font-bold">{completedToday}/{habits.length}</span>
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

          {habits.length === 0 ? (
            <Card className="p-8 border-0 shadow-soft text-center">
              <Star className="w-12 h-12 text-primary mx-auto mb-3 opacity-50" />
              <h3 className="font-semibold mb-2">No habits yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first habit to start building your chain!
              </p>
              <Button onClick={onCreateHabit} variant="hero" size="sm">
                <Plus className="w-4 h-4" />
                Create Habit
              </Button>
            </Card>
          ) : (
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
          )}
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