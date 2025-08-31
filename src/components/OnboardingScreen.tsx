import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Users, 
  Target, 
  TrendingUp, 
  Zap,
  Heart,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-onboarding.jpg";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const features = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Build Together",
    description: "Join habit chains with friends and stay accountable to each other"
  },
  {
    icon: <Target className="w-8 h-8 text-secondary" />,
    title: "Track Progress",
    description: "Visual streaks and progress rings keep you motivated daily"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-success" />,
    title: "Grow Stronger",
    description: "Earn points, badges, and climb leaderboards as you improve"
  }
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (currentStep < 2) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-bounce-in" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-40 right-20 w-12 h-12 bg-gold rounded-full animate-bounce-in" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-secondary rounded-full animate-bounce-in" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">HabitChain</span>
        </div>
        
        <Button 
          variant="floating" 
          size="sm"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Hero Image */}
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <img 
              src={heroImage} 
              alt="People building habits together"
              className="w-80 h-60 object-cover rounded-2xl shadow-strong"
            />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-gold animate-bounce-in">
              <Star className="w-6 h-6 text-gold-foreground" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <Card className="bg-white/90 backdrop-blur-sm p-6 max-w-sm mx-auto shadow-strong border-0">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {features[currentStep].icon}
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {features[currentStep].title}
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {features[currentStep].description}
              </p>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step === currentStep 
                        ? 'bg-primary w-6' 
                        : step < currentStep 
                          ? 'bg-success' 
                          : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              <Button 
                onClick={handleNext}
                variant="hero"
                size="lg"
                className="w-full group"
              >
                <span>{currentStep === 2 ? "Get Started" : "Continue"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Decorative Hearts */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 opacity-30">
        <Heart className="w-6 h-6 text-white animate-pulse" />
        <Heart className="w-4 h-4 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Heart className="w-6 h-6 text-white animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}