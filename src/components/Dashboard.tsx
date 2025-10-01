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
      <header className="relative z-10 bg-gradient-hero text-white shadow-medium">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{getGreeting()}</h1>
              <p className="text-white/90 text-sm">Keep building your chains! 🔗</p>
            </div>
            
            <nav className="flex items-center gap-2" aria-label="User actions">
              <Button variant="floating" size="icon-sm" title="Notifications">
                <Bell className="w-4 h-4" />
              </Button>
              
              <Button variant="floating" size="icon-sm" title="Settings">
                <Settings className="w-4 h-4" />
              </Button>

              <Button variant="floating" size="icon-sm" onClick={logout} title="Logout">
                <LogOut className="w-4 h-4" />
              </Button>
            </nav>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-1.5 mb-1">
                <Flame className="w-5 h-5 text-warning" />
                <span className="text-2xl font-bold">{totalStreak}</span>
              </div>
              <span className="text-xs text-white/80 font-medium">Total Streak</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-5 h-5 text-gold" />
                <span className="text-2xl font-bold">{weeklyPoints}</span>
              </div>
              <span className="text-xs text-white/80 font-medium">Weekly Points</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy className="w-5 h-5 text-gold" />
                <span className="text-2xl font-bold">#{habits.length > 0 ? '1' : '-'}</span>
              </div>
              <span className="text-xs text-white/80 font-medium">Leaderboard</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-1.5 mb-1">
                <Target className="w-5 h-5 text-success" />
                <span className="text-2xl font-bold">{completedToday}/{habits.length}</span>
              </div>
              <span className="text-xs text-white/80 font-medium">Today</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick Actions */}
        <section className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={onCreateHabit}
            variant="hero" 
            size="lg"
            className="flex-1 justify-center"
          >
            <Plus className="w-5 h-5" />
            <span>Create Habit</span>
          </Button>
          
          <Button variant="soft" size="lg" className="flex-1 justify-center">
            <Users className="w-5 h-5" />
            <span>Join Chain</span>
          </Button>
        </section>

        {/* Today's Habits Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Today's Habits</h2>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold px-4 py-1">
              {habits.filter(h => !h.todayCompleted).length} pending
            </Badge>
          </div>

          {habits.length === 0 ? (
            <Card className="p-12 border-0 shadow-medium text-center bg-card">
              <Star className="w-16 h-16 text-primary mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">No habits yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Create your first habit to start building your chain and track your progress!
              </p>
              <Button onClick={onCreateHabit} variant="hero" size="lg">
                <Plus className="w-5 h-5" />
                Create First Habit
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {habits.map((habit) => (
                <button
                  key={habit.id}
                  onClick={() => onHabitClick(habit.id)}
                  className="text-left w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl transition-all hover:scale-[1.01]"
                >
                  <HabitCard 
                    habit={habit} 
                    onComplete={handleCompleteHabit}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Motivational Card */}
        {habits.length > 0 && (
          <Card className="p-6 bg-gradient-soft border-0 shadow-medium mt-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/60 rounded-2xl shadow-soft">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-1 text-lg">You're on fire! 🔥</h3>
                <p className="text-sm text-primary/80 leading-relaxed">
                  You've completed {completedToday} out of {habits.length} habits today. Keep it up!
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Bottom Spacing */}
        <div className="h-12" />
      </main>
    </div>
  );
}