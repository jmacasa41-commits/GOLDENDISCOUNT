import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";
import { ManualLocationDialog } from "@/components/ManualLocationDialog";

export default function Welcome() {
  const navigate = useNavigate();
  const { requestLocation, isLoading } = useLocation();
  const [step, setStep] = useState<"welcome" | "location">("welcome");
  const [showManualDialog, setShowManualDialog] = useState(false);

  const handleContinue = () => {
    setStep("location");
  };

  const handleUseCurrentLocation = async () => {
    await requestLocation();
    navigate("/home");
  };

  const handleManualLocationClick = () => {
    setShowManualDialog(true);
  };

  const handleManualLocationSet = () => {
    navigate("/home");
  };

  const handleSkipForNow = () => {
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
          <h1 className="text-senior-3xl font-bold text-secondary mb-2">
            GOLDEN CONNECT
          </h1>
          <p className="text-senior-lg text-muted-foreground max-w-md mx-auto">
            A simple way for seniors to find discounts nearby.
          </p>
        </div>

        {/* Onboarding Content */}
        <div className="space-y-6">
          {step === "welcome" && (
            <div className="space-y-6 animate-scale-in">
              <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-6">
                <div className="space-y-3">
                  <h2 className="text-senior-2xl font-semibold text-foreground">
                    Welcome! 👋
                  </h2>
                  <p className="text-senior-base text-muted-foreground">
                    See discounts for food, groceries, medicine, and more—made especially for seniors.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleContinue}
                    className="w-full btn-senior bg-primary hover:bg-primary/90 text-primary-foreground text-senior-lg py-4"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "location" && (
            <div className="space-y-6 animate-scale-in">
              <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-6">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h2 className="text-senior-xl font-semibold text-foreground">
                    Choose your location
                  </h2>
                  <p className="text-senior-base text-muted-foreground">
                    This helps us show discounts that are closest to you.
                  </p>
                </div>

                <div className="mt-4 space-y-4">
                  <Button
                    onClick={handleUseCurrentLocation}
                    disabled={isLoading}
                    variant="secondary"
                    className="w-full btn-senior bg-secondary hover:bg-secondary/90 text-secondary-foreground text-senior-lg py-4 border-secondary-foreground/20"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    ) : (
                      <MapPin className="w-6 h-6 mr-2" />
                    )}
                    {isLoading ? "Detecting..." : "Use my current location"}
                  </Button>

                  <Button
                    onClick={handleManualLocationClick}
                    variant="outline"
                    className="w-full btn-senior text-senior-lg py-4"
                  >
                    Enter my town or city
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ManualLocationDialog
        open={showManualDialog}
        onOpenChange={setShowManualDialog}
        onLocationSet={handleManualLocationSet}
      />
    </div>
  );
}
