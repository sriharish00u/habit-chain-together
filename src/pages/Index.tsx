import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { Dashboard } from "@/components/Dashboard";
import { CreateHabitScreen } from "@/components/CreateHabitScreen";

type AppScreen = 'onboarding' | 'dashboard' | 'create-habit' | 'habit-detail';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleCreateHabit = () => {
    setCurrentScreen('create-habit');
  };

  const handleHabitSaved = (habit: any) => {
    console.log('New habit created:', habit);
    setCurrentScreen('dashboard');
  };

  const handleHabitClick = (habitId: string) => {
    setSelectedHabitId(habitId);
    // For now, just log - later we'll add habit detail screen
    console.log('Habit clicked:', habitId);
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedHabitId(null);
  };

  return (
    <main className="min-h-screen bg-background font-inter">
      <Toaster />
      
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
    </main>
  );
};

export default Index;
