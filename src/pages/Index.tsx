import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { Dashboard } from "@/components/Dashboard";
import { CreateHabitScreen } from "@/components/CreateHabitScreen";
import { HabitChainScreen } from "@/components/HabitChainScreen";
import { AuthScreen } from "@/components/AuthScreen";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

type AppScreen = 'auth' | 'onboarding' | 'dashboard' | 'create-habit' | 'habit-detail';

const Index = () => {
  const { user, loading, login, signup } = useAuth();
  const { toast } = useToast();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('auth');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('habitchain_onboarding_complete');
    setHasSeenOnboarding(!!seen);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        setCurrentScreen(hasSeenOnboarding ? 'dashboard' : 'onboarding');
      } else {
        setCurrentScreen('auth');
      }
    }
  }, [user, loading, hasSeenOnboarding]);

  const handleAuth = (name: string, email: string, password: string, isSignup: boolean) => {
    try {
      if (isSignup) {
        signup(name, email, password);
        toast({
          title: "Welcome to HabitChain! 🎉",
          description: "Your account has been created successfully."
        });
      } else {
        login(email, password);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('habitchain_onboarding_complete', 'true');
    setHasSeenOnboarding(true);
    setCurrentScreen('dashboard');
  };

  const handleCreateHabit = () => {
    setCurrentScreen('create-habit');
  };

  const handleHabitSaved = (habit: any) => {
    setCurrentScreen('dashboard');
  };

  const handleHabitClick = (habitId: string) => {
    setSelectedHabitId(habitId);
    setCurrentScreen('habit-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedHabitId(null);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background font-inter">
      <Toaster />
      
      {currentScreen === 'auth' && (
        <AuthScreen onAuth={handleAuth} />
      )}
      
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard 
          onCreateHabit={handleCreateHabit}
          onHabitClick={handleHabitClick}
        />
      )}
      
      {currentScreen === 'create-habit' && (
        <CreateHabitScreen 
          onBack={handleBackToDashboard}
          onSave={handleHabitSaved}
        />
      )}

      {currentScreen === 'habit-detail' && selectedHabitId && (
        <HabitChainScreen 
          habitId={selectedHabitId}
          onBack={handleBackToDashboard}
        />
      )}
    </main>
  );
};

export default Index;
