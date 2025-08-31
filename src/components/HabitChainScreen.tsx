import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  Flame,
  Users,
  Crown,
  MessageCircle,
  Send,
  CheckCircle2,
  Camera,
  Star,
  Trophy,
  TrendingUp,
  Clock,
  Calendar
} from "lucide-react";

interface HabitChainScreenProps {
  habitId: string;
  onBack: () => void;
}

// Mock data - in real app this would come from API
const mockHabitDetail = {
  id: "1",
  name: "Morning Workout",
  description: "30 minutes of exercise to start the day strong",
  category: "fitness",
  streak: 12,
  todayCompleted: false,
  weekProgress: 85,
  totalPoints: 1240,
  chain: [
    { id: "1", name: "You", avatar: "🏃", streak: 12, points: 1240, isMe: true, todayCompleted: false },
    { id: "2", name: "Sarah", avatar: "💪", streak: 18, points: 1580, isMe: false, todayCompleted: true },
    { id: "3", name: "Mike", avatar: "⚡", streak: 8, points: 920, isMe: false, todayCompleted: true },
    { id: "4", name: "Emma", avatar: "🔥", streak: 22, points: 1890, isMe: false, todayCompleted: false },
    { id: "5", name: "Alex", avatar: "💫", streak: 5, points: 650, isMe: false, todayCompleted: true }
  ],
  messages: [
    { id: "1", user: "Sarah", avatar: "💪", message: "Great workout this morning! 💪", time: "8:30 AM", isMe: false },
    { id: "2", user: "You", avatar: "🏃", message: "Nice! What did you focus on today?", time: "8:35 AM", isMe: true },
    { id: "3", user: "Mike", avatar: "⚡", message: "Hit a new PR on deadlifts! 🎉", time: "9:15 AM", isMe: false },
    { id: "4", user: "Emma", avatar: "🔥", message: "Crushing it team! Keep the chain strong 🔗", time: "2:20 PM", isMe: false }
  ]
};

export function HabitChainScreen({ habitId, onBack }: HabitChainScreenProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const habit = mockHabitDetail;

  const handleComplete = async () => {
    if (habit.todayCompleted) return;
    
    setIsCompleting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsCompleting(false);
    // In real app, this would update the habit state
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In real app, this would send the message to the chain
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const sortedChain = [...habit.chain].sort((a, b) => b.streak - a.streak);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-hero text-white">
        <div className="flex items-center justify-between p-6 pt-12">
          <Button variant="floating" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center flex-1 mx-4">
            <h1 className="font-bold text-lg">{habit.name}</h1>
            <p className="text-white/80 text-sm">{habit.chain.length} members strong</p>
          </div>
          
          <Button variant="floating" size="icon">
            <Users className="w-5 h-5" />
          </Button>
        </div>

        {/* Stats Row */}
        <div className="px-6 pb-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-5 h-5 text-warning" />
              <span className="text-2xl font-bold">{habit.streak}</span>
            </div>
            <span className="text-xs text-white/70">Your Streak</span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-5 h-5 text-gold" />
              <span className="text-2xl font-bold">{habit.totalPoints}</span>
            </div>
            <span className="text-xs text-white/70">Total Points</span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-2xl font-bold">{habit.weekProgress}%</span>
            </div>
            <span className="text-xs text-white/70">This Week</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Today's Challenge */}
        <Card className="p-6 bg-gradient-soft border-0 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Today's Challenge</h2>
            <Badge variant="secondary" className="bg-white/50">
              <Calendar className="w-3 h-3 mr-1" />
              Day {habit.streak + 1}
            </Badge>
          </div>
          
          <p className="text-primary/80 mb-4">{habit.description}</p>
          
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
                <CheckCircle2 className="w-5 h-5" />
                <span>Completed! Great job! 🎉</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <span>Complete with Photo</span>
              </div>
            )}
          </Button>
        </Card>

        {/* Chain Leaderboard */}
        <Card className="p-6 border-0 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Chain Leaderboard</h2>
            <Trophy className="w-5 h-5 text-gold" />
          </div>
          
          <div className="space-y-3">
            {sortedChain.map((member, index) => (
              <div 
                key={member.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  member.isMe 
                    ? 'bg-primary-light/20 border-2 border-primary/30' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {member.avatar}
                  </div>
                  {index === 0 && (
                    <Crown className="w-4 h-4 text-gold absolute -top-1 -right-1" />
                  )}
                  {member.todayCompleted && (
                    <CheckCircle2 className="w-4 h-4 text-success absolute -bottom-1 -right-1 bg-white rounded-full" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {member.isMe ? "You" : member.name}
                    </span>
                    {index < 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        #{index + 1}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {member.streak} days
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {member.points} pts
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  {member.todayCompleted ? (
                    <Badge variant="outline" className="bg-success-light text-success border-success">
                      Done ✓
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Section */}
        <Card className="border-0 shadow-soft">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Chain Chat</h2>
            <Badge variant="secondary" className="ml-auto">
              {habit.messages.length}
            </Badge>
          </div>
          
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {habit.messages.map((message) => (
              <div 
                key={message.id}
                className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                  {message.avatar}
                </div>
                
                <div className={`flex-1 ${message.isMe ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{message.user}</span>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                    message.isMe 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Encourage your chain..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="icon"
                variant="hero"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Bottom Spacing */}
        <div className="h-6" />
      </div>
    </div>
  );
}