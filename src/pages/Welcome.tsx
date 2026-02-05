import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";
import { ManualLocationDialog } from "@/components/ManualLocationDialog";
import { GoldenBadgeLogo } from "@/components/GoldenBadgeLogo";

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
    <div className="min-h-screen bg-mesh-gold relative overflow-hidden flex flex-col items-center px-6 py-12">
      {/* Premium Ambient Overlays */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md text-center relative z-10 my-auto animate-premium-fade">
        {/* Logo & Headline Section */}
        <div className="mb-12 md:mb-16">
          <div className="mb-8 md:mb-10 flex justify-center transform transition-all duration-1000 active:scale-95 px-4">
            <div className="relative w-full max-w-[200px] md:max-w-[240px] aspect-square">
              <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full scale-110 animate-pulse" />
              <div className="bg-white p-4 md:p-6 rounded-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white/20 relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src="/icon-512.svg"
                  alt="GoldenConnect Logo"
                  className="w-full h-full object-contain transform hover:rotate-12 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 px-2">
            <h1 className="text-senior-2xl md:text-senior-3xl font-black text-slate-800 tracking-tighter uppercase italic leading-[0.9] md:leading-none">
              GOLDEN<span className="opacity-60 not-italic font-light">CONNECT</span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-slate-700 py-2 px-6 bg-slate-100/90 backdrop-blur-sm rounded-2xl md:rounded-full w-full max-w-[90%] mx-auto border border-slate-300 shadow-sm overflow-hidden line-clamp-2">
              <span className="text-[13px] md:text-senior-sm font-black uppercase tracking-wider md:tracking-[0.2em] leading-snug">
                A simple way for seniors to find discounts nearby.
              </span>
            </div>
          </div>
        </div>

        {/* Onboarding Interaction Area */}
        <div className="space-y-4 md:space-y-6 w-full px-2 md:px-0">
          {step === "welcome" && (
            <div className="animate-premium-scale">
              <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 space-y-6 md:space-y-10 border-2 border-slate-200 shadow-xl mx-auto">
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-senior-xl md:text-senior-2xl font-black text-slate-800 leading-tight">
                    Welcome! 👋
                  </h2>
                  <p className="text-senior-base text-slate-700 leading-relaxed font-medium text-lg md:text-xl">
                    "Good news! Your exclusive senior discounts are available right now."
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleContinue}
                    className="w-full btn-senior bg-primary hover:bg-primary/90 text-white hover:text-white py-8 md:py-10 rounded-2xl text-xl shadow-lg border-none transition-colors h-auto min-h-[70px] md:min-h-[80px]"
                  >
                    CONTINUE
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "location" && (
            <div className="animate-premium-scale">
              <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 space-y-6 md:space-y-10 border-2 border-slate-200 shadow-xl mx-auto">
                <div className="space-y-3 md:space-y-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-[1.25rem] md:rounded-[1.5rem] flex items-center justify-center mx-auto mb-2 border-2 border-primary/30">
                    <MapPin className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-senior-lg md:text-senior-xl font-black text-slate-800 uppercase text-center">
                    Show Discounts Near You
                  </h2>
                </div>

                <div className="mt-4 space-y-3 md:space-y-4">
                  <Button
                    onClick={handleUseCurrentLocation}
                    disabled={isLoading}
                    className="w-full btn-senior bg-primary hover:bg-primary/90 text-white hover:text-white border-none shadow-lg transition-colors h-auto min-h-[70px] md:min-h-[80px]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-7 h-7 md:w-8 md:h-8 mr-2 md:mr-3 animate-spin" />
                    ) : (
                      <MapPin className="w-7 h-7 md:w-8 md:h-8 mr-2 md:mr-3" />
                    )}
                    <span className="text-lg md:text-xl">
                      {isLoading ? "Searching..." : "Use My Current Location"}
                    </span>
                  </Button>

                  <Button
                    onClick={handleManualLocationClick}
                    variant="outline"
                    className="w-full btn-senior bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-800 border-2 border-slate-300 shadow-md transition-colors h-auto min-h-[70px] md:min-h-[80px]"
                  >
                    <span className="text-lg md:text-xl">Enter Town or City</span>
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
