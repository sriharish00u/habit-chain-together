import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useHabits } from "@/hooks/useHabits";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Camera,
  Clock,
  Users,
  Target,
  Star,
  TrendingUp,
  Heart,
  BookOpen,
  Dumbbell,
  Coffee,
  Smartphone,
  Music
} from "lucide-react";

interface CreateHabitScreenProps {
  onBack: () => void;
  onSave: (habit: any) => void;
}

const categories = [
  { id: 'fitness', name: 'Fitness', icon: Dumbbell, color: 'bg-red-100 text-red-600' },
  { id: 'learning', name: 'Learning', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
  { id: 'mindfulness', name: 'Mindfulness', icon: Star, color: 'bg-purple-100 text-purple-600' },
  { id: 'health', name: 'Health', icon: Heart, color: 'bg-green-100 text-green-600' },
  { id: 'creativity', name: 'Creativity', icon: Music, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'productivity', name: 'Work', icon: Target, color: 'bg-gray-100 text-gray-600' }
];

const frequencies = [
  { id: 'daily', name: 'Daily', description: 'Every day' },
  { id: 'weekdays', name: 'Weekdays', description: 'Monday to Friday' },
  { id: 'custom', name: 'Custom', description: 'Choose specific days' }
];

export function CreateHabitScreen({ onBack, onSave }: CreateHabitScreenProps) {
  const { user } = useAuth();
  const { addHabit } = useHabits(user?.id);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    frequency: 'daily',
    reminderTime: '09:00',
    requirePhoto: false,
    isPublic: true
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSave = () => {
    addHabit(formData);
    toast({
      title: "Habit created! 🎉",
      description: `"${formData.name}" has been added to your habits.`
    });
    onSave(formData);
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.category !== '';
      case 2:
        return formData.frequency !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h1 className="font-semibold">Create New Habit</h1>
            <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          </div>
          
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 border-0 shadow-soft">
              <h2 className="text-xl font-bold mb-4">What habit do you want to build?</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Habit Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Morning workout, Read 30 minutes..."
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add more details about your habit..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-2 min-h-20"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-soft">
              <h3 className="font-semibold mb-4">Choose a Category</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.category === category.id
                          ? 'border-primary bg-primary-light/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center mb-2 mx-auto`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Frequency & Reminders */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 border-0 shadow-soft">
              <h2 className="text-xl font-bold mb-4">How often?</h2>
              
              <div className="space-y-3">
                {frequencies.map((freq) => (
                  <button
                    key={freq.id}
                    onClick={() => setFormData(prev => ({ ...prev, frequency: freq.id }))}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.frequency === freq.id
                        ? 'border-primary bg-primary-light/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium">{freq.name}</div>
                    <div className="text-sm text-muted-foreground">{freq.description}</div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-soft">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Reminder Time
              </h3>
              
              <Input
                type="time"
                value={formData.reminderTime}
                onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
                className="w-full"
              />
            </Card>
          </div>
        )}

        {/* Step 3: Social & Verification */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 border-0 shadow-soft">
              <h2 className="text-xl font-bold mb-4">Final touches</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Photo Proof</div>
                      <div className="text-sm text-muted-foreground">Require photo verification</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, requirePhoto: !prev.requirePhoto }))}
                    className={`w-12 h-6 rounded-full transition-all ${
                      formData.requirePhoto ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      formData.requirePhoto ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Public Chain</div>
                      <div className="text-sm text-muted-foreground">Others can join your habit</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                    className={`w-12 h-6 rounded-full transition-all ${
                      formData.isPublic ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      formData.isPublic ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-soft bg-gradient-soft">
              <div className="text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-primary mb-2">Ready to start your journey!</h3>
                <p className="text-sm text-primary/80">
                  Your habit chain will begin today. Stay consistent and watch your streak grow!
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm border-t border-border">
          <Button 
            onClick={handleNext}
            disabled={!isStepComplete()}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {currentStep === totalSteps ? 'Create Habit' : 'Continue'}
          </Button>
        </div>

        {/* Bottom Spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}