import { useState, useEffect } from 'react';

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string;
  category: string;
  frequency: string;
  reminderTime: string;
  requirePhoto: boolean;
  isPublic: boolean;
  streak: number;
  todayCompleted: boolean;
  weekProgress: number;
  chainMembers: number;
  points: number;
  createdAt: string;
  lastCompletedDate?: string;
}

const STORAGE_KEY = 'habitchain_habits';

export function useHabits(userId: string | undefined) {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    if (!userId) return;
    loadHabits();
  }, [userId]);

  const loadHabits = () => {
    const allHabits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const userHabits = allHabits.filter((h: Habit) => h.userId === userId);
    setHabits(userHabits);
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'streak' | 'todayCompleted' | 'weekProgress' | 'chainMembers' | 'points' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      userId: userId!,
      streak: 0,
      todayCompleted: false,
      weekProgress: 0,
      chainMembers: 1,
      points: 0,
      createdAt: new Date().toISOString()
    };

    const allHabits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    allHabits.push(newHabit);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allHabits));
    setHabits(prev => [...prev, newHabit]);
  };

  const completeHabit = (habitId: string) => {
    const today = new Date().toDateString();
    const allHabits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const habitIndex = allHabits.findIndex((h: Habit) => h.id === habitId);
    
    if (habitIndex !== -1) {
      const habit = allHabits[habitIndex];
      const lastCompleted = habit.lastCompletedDate ? new Date(habit.lastCompletedDate).toDateString() : null;
      
      if (lastCompleted !== today) {
        allHabits[habitIndex] = {
          ...habit,
          todayCompleted: true,
          streak: habit.streak + 1,
          points: habit.points + 10,
          lastCompletedDate: new Date().toISOString()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allHabits));
        loadHabits();
      }
    }
  };

  return { habits, addHabit, completeHabit, loadHabits };
}
