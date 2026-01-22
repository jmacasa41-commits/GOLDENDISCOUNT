import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MapPin, Clock, Phone, Info, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";

// Mock discount details
const mockDiscountDetails: Record<string, {
  businessName: string;
  discount: string;
  description: string;
  eligibilityAge: number;
  validDays: string;
  validHours: string;
  address: string;
  phone: string;
  howToClaim: string[];
}> = {
  "1": {
    businessName: "Golden Corral",
    discount: "15% off",
    description: "Enjoy 15% off your total bill at Golden Corral buffet restaurants.",
    eligibilityAge: 60,
    validDays: "Monday - Friday",
    validHours: "11:00 AM - 4:00 PM",
    address: "123 Main Street, San Francisco, CA",
    phone: "(555) 123-4567",
    howToClaim: [
      "Show your ID to verify age",
      "Mention senior discount when ordering",
      "Discount applies to dine-in only",
    ],
  },
  "2": {
    businessName: "Denny's",
    discount: "20% off breakfast",
    description: "Get 20% off your breakfast order every day at participating locations.",
    eligibilityAge: 55,
    validDays: "Every Day",
    validHours: "6:00 AM - 11:00 AM",
    address: "456 Oak Avenue, San Francisco, CA",
    phone: "(555) 234-5678",
    howToClaim: [
      "Request senior menu when seated",
      "Show ID if requested",
      "Valid for breakfast items only",
    ],
  },
};

// Fallback for unknown IDs
const defaultDetails = {
  businessName: "Local Business",
  discount: "Senior Discount Available",
  description: "Contact the business for full discount details.",
  eligibilityAge: 55,
  validDays: "Varies",
  validHours: "Business Hours",
  address: "Contact for address",
  phone: "Contact for phone",
  howToClaim: ["Ask staff about senior discount", "Show valid ID"],
};

export default function DiscountDetail() {
  const { discountId } = useParams<{ discountId: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const details = discountId ? (mockDiscountDetails[discountId] || defaultDetails) : defaultDetails;

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleGetDirections = () => {
    // In a real app, this would open maps
    window.open(`https://maps.google.com/?q=${encodeURIComponent(details.address)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-36">
      <PageHeader title="Discount Details" />

      <main className="px-4 py-6 space-y-6">
        {/* Business Header */}
        <div className="bg-card border-2 border-border rounded-2xl p-6 animate-fade-in">
          <h2 className="text-senior-2xl font-bold text-foreground mb-2">
            {details.businessName}
          </h2>
          <p className="text-senior-xl text-primary font-bold mb-4">
            {details.discount}
          </p>
          <p className="text-senior-base text-muted-foreground">
            {details.description}
          </p>
        </div>

        {/* Eligibility */}
        <div className="bg-success/10 border-2 border-success/20 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-success" />
            <h3 className="text-senior-lg font-semibold text-foreground">
              Eligibility
            </h3>
          </div>
          <p className="text-senior-base text-muted-foreground">
            Available for customers aged <strong>{details.eligibilityAge}+</strong>
          </p>
        </div>

        {/* Valid Times */}
        <div className="bg-card border-2 border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="text-senior-lg font-semibold text-foreground">
              When to Visit
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-senior-base text-muted-foreground">
              <strong>Days:</strong> {details.validDays}
            </p>
            <p className="text-senior-base text-muted-foreground">
              <strong>Hours:</strong> {details.validHours}
            </p>
          </div>
        </div>

        {/* How to Claim */}
        <div className="bg-card border-2 border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-primary" />
            <h3 className="text-senior-lg font-semibold text-foreground">
              How to Get Your Discount
            </h3>
          </div>
          <ol className="space-y-3">
            {details.howToClaim.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-senior-base text-muted-foreground pt-1">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact Info */}
        <div className="bg-card border-2 border-border rounded-2xl p-5">
          <h3 className="text-senior-lg font-semibold text-foreground mb-4">
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-muted-foreground" />
              <span className="text-senior-base text-muted-foreground">
                {details.address}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-muted-foreground" />
              <a 
                href={`tel:${details.phone}`}
                className="text-senior-base text-primary underline"
              >
                {details.phone}
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-20 left-0 right-0 bg-background border-t-2 border-border px-4 py-4 z-40">
        <div className="flex gap-4 max-w-md mx-auto">
          <Button
            onClick={handleSave}
            variant={isSaved ? "default" : "outline"}
            className={`flex-1 btn-senior ${
              isSaved 
                ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                : "border-2"
            }`}
          >
            <Heart className={`w-6 h-6 mr-2 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button
            onClick={handleGetDirections}
            className="flex-1 btn-senior bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <MapPin className="w-6 h-6 mr-2" />
            Directions
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
