import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Welcome() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"age" | "location" | "ready">("age");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleAgeConfirm = () => {
    setAgeConfirmed(true);
    setStep("location");
  };

  const handleLocationEnable = () => {
    setLocationEnabled(true);
    setStep("ready");
  };

  const handleSkipLocation = () => {
    setStep("ready");
  };

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center animate-fade-in">
        {/* Logo & Title */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-5xl">🌟</span>
          </div>
          <h1 className="text-senior-3xl font-bold text-secondary mb-3">
            GoldenConnect
          </h1>
          <p className="text-senior-lg text-muted-foreground">
            Your guide to senior discounts
          </p>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === "age" && (
            <div className="space-y-6 animate-scale-in">
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <h2 className="text-senior-xl font-semibold text-foreground mb-4">
                  Welcome! 👋
                </h2>
                <p className="text-senior-base text-muted-foreground mb-8">
                  GoldenConnect helps you find senior discounts at restaurants, stores, and more.
                </p>
                <Button
                  onClick={handleAgeConfirm}
                  className="w-full btn-senior bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Check className="w-6 h-6 mr-2" />
                  I'm 50 or older
                </Button>
              </div>
            </div>
          )}

          {step === "location" && (
            <div className="space-y-6 animate-scale-in">
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h2 className="text-senior-xl font-semibold text-foreground mb-4">
                  Find Nearby Discounts
                </h2>
                <p className="text-senior-base text-muted-foreground mb-8">
                  Allow location access to discover discounts near you.
                </p>
                <div className="space-y-4">
                  <Button
                    onClick={handleLocationEnable}
                    className="w-full btn-senior bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <MapPin className="w-6 h-6 mr-2" />
                    Enable Location
                  </Button>
                  <Button
                    onClick={handleSkipLocation}
                    variant="ghost"
                    className="w-full btn-senior text-muted-foreground"
                  >
                    Enter location manually
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "ready" && (
            <div className="space-y-6 animate-scale-in">
              <div className="bg-card border-2 border-border rounded-2xl p-8">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-senior-xl font-semibold text-foreground mb-4">
                  You're All Set!
                </h2>
                <p className="text-senior-base text-muted-foreground mb-8">
                  Start exploring discounts and save money today.
                </p>
                <Button
                  onClick={handleGetStarted}
                  className="w-full btn-senior bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Get Started
                </Button>
              </div>

              {/* Status indicators */}
              <div className="flex justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-senior-sm">Age confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  {locationEnabled ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : (
                    <MapPin className="w-5 h-5" />
                  )}
                  <span className="text-senior-sm">
                    {locationEnabled ? "Location on" : "Manual location"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
