import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Users, 
  Target, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Star
} from "lucide-react";

interface HabitCardProps {
  habit: {
    id: string;
    name: string;
    streak: number;
    todayCompleted: boolean;
    weekProgress: number;
    chainMembers: number;
    category: string;
    points: number;
    nextReminder?: string;
  };
  onComplete: (habitId: string) => void;
}

export function HabitCard({ habit, onComplete }: HabitCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    if (habit.todayCompleted) return;
    
    setIsCompleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    onComplete(habit.id);
    setIsCompleting(false);
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-gold";
    if (streak >= 14) return "text-warning";
    if (streak >= 7) return "text-success";
    return "text-primary";
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'fitness': return <Target className="w-4 h-4" />;
      case 'mindfulness': return <Star className="w-4 h-4" />;
      case 'learning': return <TrendingUp className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-soft hover-lift">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-soft rounded-lg">
            {getCategoryIcon(habit.category)}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{habit.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{habit.chainMembers} members</span>
            </div>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-primary-light/20 text-primary">
          {habit.points} pts
        </Badge>
      </div>

      {/* Streak Display */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Flame className={`w-5 h-5 ${getStreakColor(habit.streak)}`} />
          <span className={`text-xl font-bold ${getStreakColor(habit.streak)}`}>
            {habit.streak}
          </span>
          <span className="text-muted-foreground text-sm">day streak</span>
        </div>
        
        {habit.nextReminder && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{habit.nextReminder}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Weekly Progress</span>
          <span className="font-medium">{habit.weekProgress}%</span>
        </div>
        <Progress value={habit.weekProgress} className="h-2" />
      </div>

      {/* Action Button */}
      <Button 
        onClick={handleComplete}
        disabled={habit.todayCompleted || isCompleting}
        variant={habit.todayCompleted ? "success" : "hero"}
        size="lg"
        className="w-full"
      >
        {isCompleting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Completing...</span>
          </div>
        ) : habit.todayCompleted ? (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed Today!</span>
          </div>
        ) : (
          <span>Mark Complete</span>
        )}
      </Button>
    </Card>
  );
}