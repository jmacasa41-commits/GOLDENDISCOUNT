import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MapPin, Clock, Phone, Info, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { useLocation } from "@/contexts/LocationContext";
import { discounts as allDiscounts, categoryPromoDetails } from "@/data/discounts";
import { useSavedDiscounts } from "@/contexts/SavedDiscountsContext";

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
  // Restaurants
  "1": {
    businessName: "Jollibee",
    discount: "20% off for Senior Citizens",
    description: "Enjoy your favorite Langhap Sarap meals with a special discount for seniors.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "Store Hours",
    address: "Rizal Avenue, Manila",
    phone: "(02) 8-87000",
    howToClaim: ["Present Senior Citizen ID"],
  },
  "2": {
    businessName: "Max's Restaurant",
    discount: "20% off all meals for 60+",
    description: "The House That Fried Chicken Built welcomes seniors with exclusive discounts.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "10:00 AM - 9:00 PM",
    address: "Ayala Malls Manila Bay, Paranaque",
    phone: "(02) 8-888-9000",
    howToClaim: ["Present Senior Citizen ID", "Sign the logbook"],
  },
  "3": {
    businessName: "Mang Inasal",
    discount: "20% off for seniors",
    description: "Unli-rice favorites specifically discounted for our beloved seniors.",
    eligibilityAge: 60,
    validDays: "Monday - Sunday",
    validHours: "10:00 AM - 10:00 PM",
    address: "SM Mall of Asia, Pasay City",
    phone: "(02) 8-733-1111",
    howToClaim: ["Show Senior ID at counter"],
  },
  "4": {
    businessName: "Goldilocks",
    discount: "20% off cakes & pastries",
    description: "Sweet treats and celebration cakes at a discount for Lolo and Lola.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "Store Hours",
    address: "Shaw Blvd, Mandaluyong City",
    phone: "(02) 8-888-1999",
    howToClaim: ["Present ID upon payment"],
  },
  "5": {
    businessName: "Chowking",
    discount: "20% off for Senior Citizens",
    description: "Chinese-style fried chicken and dimsum favorites at senior-friendly prices.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "24 Hours (Select Branches)",
    address: "Quezon Avenue, Quezon City",
    phone: "(02) 9-88-88",
    howToClaim: ["Present Senior ID"],
  },

  // Groceries
  "6": {
    businessName: "SM Supermarket",
    discount: "5% off + 20% SC discount",
    description: "Get discounts on basic necessities and prime commodities.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "8:00 AM - 10:00 PM",
    address: "SM Megamall Bldg A, Mandaluyong",
    phone: "(02) 8-633-5042",
    howToClaim: ["Use Priority Lane", "Present Booklet & ID"],
  },
  "7": {
    businessName: "Puregold",
    discount: "20% off for seniors daily",
    description: "Sa Puregold, panalo ang seniors! Discount on eligible grocery items.",
    eligibilityAge: 60,
    validDays: "Monday - Sunday",
    validHours: "8:00 AM - 9:00 PM",
    address: "E. Rodriguez Sr. Ave, Quezon City",
    phone: "(02) 8-712-3456",
    howToClaim: ["Show Senior ID", "Present Purchase Booklet"],
  },
  "8": {
    businessName: "Robinsons Supermarket",
    discount: "20% SC discount on groceries",
    description: "Healthy choices made affordable for seniors.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "9:00 AM - 9:00 PM",
    address: "Robinsons Galleria, Ortigas",
    phone: "(02) 8-397-1888",
    howToClaim: ["Present Senior ID at cashier"],
  },
  "9": {
    businessName: "Metro Supermarket",
    discount: "20% off for 60+ on all items",
    description: "Fresh produce and grocery needs with senior privileges.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "9:00 AM - 8:00 PM",
    address: "Market! Market!, Taguig",
    phone: "(02) 8-886-7777",
    howToClaim: ["Present ID and Booklet"],
  },

  // Travel
  "10": {
    businessName: "Philippine Airlines",
    discount: "20% off domestic flights",
    description: "Fly across the Philippines with exclusive senior fares.",
    eligibilityAge: 60,
    validDays: "Booking Date",
    validHours: "Online / Office Hours",
    address: "PNB Financial Center, Pasay City",
    phone: "(02) 8-855-8888",
    howToClaim: ["Book online with Senior tag", "Show ID at Check-in"],
  },
  "11": {
    businessName: "Cebu Pacific",
    discount: "20% senior discount on base fare",
    description: "Low fares made even lower for our senior travelers.",
    eligibilityAge: 60,
    validDays: "Booking Date",
    validHours: "Online 24/7",
    address: "NAIA Terminal 3, Pasay City",
    phone: "(02) 8-702-0888",
    howToClaim: ["Input Senior ID details during booking"],
  },
  "12": {
    businessName: "2GO Travel",
    discount: "20% off ferry tickets",
    description: "Sea travel discounts for senior citizens.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "Office Hours",
    address: "Pier 4, North Harbor, Manila",
    phone: "(02) 8-528-7000",
    howToClaim: ["Buy at ticket outlet with ID"],
  },
  "13": {
    businessName: "Victory Liner",
    discount: "20% off bus fare",
    description: "Provincial bus travel discount for seniors.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "Terminal Hours",
    address: "EDSA Cubao, Quezon City",
    phone: "(02) 8-727-4688",
    howToClaim: ["Present ID at ticket booth"],
  },

  // Entertainment
  "14": {
    businessName: "SM Cinema",
    discount: "20% off movie tickets",
    description: "Watch the latest blockbusters with a senior discount. Free on Mondays/Tuesdays in some cities!",
    eligibilityAge: 60,
    validDays: "Every Day (Free days vary by city)",
    validHours: "Cinema Schedule",
    address: "SM North EDSA, Quezon City",
    phone: "(02) 8-929-6686",
    howToClaim: ["Present Senior ID at ticket booth"],
  },
  "15": {
    businessName: "Ayala Cinemas",
    discount: "20% senior discount",
    description: "Premium cinema experience at a discounted rate.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "Cinema Schedule",
    address: "Greenbelt 3, Makati City",
    phone: "(02) 7-795-9595",
    howToClaim: ["Show ID at concierge or counter"],
  },
  "16": {
    businessName: "National Museum",
    discount: "Free admission",
    description: "Explore Filipino heritage and art for free.",
    eligibilityAge: 60,
    validDays: "Tuesday - Sunday",
    validHours: "10:00 AM - 5:00 PM",
    address: "Padre Burgos Ave, Ermita, Manila",
    phone: "(02) 8-527-1215",
    howToClaim: ["Walk in", "Sign logbook"],
  },
  "17": {
    businessName: "Ocean Park Manila",
    discount: "20% off entrance",
    description: "Marine theme park adventure with senior privileges.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "10:00 AM - 6:00 PM",
    address: "Quirino Grandstand, Manila",
    phone: "(02) 8-567-7777",
    howToClaim: ["Buy ticket at senior counter"],
  },

  // Healthcare
  "18": {
    businessName: "Mercury Drug",
    discount: "20% off medicines",
    description: "Nakasisiguro gamot ay laging bago. 20% off on generic and branded medicines.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "24 Hours (Select Branches)",
    address: "Gloria Diaz St, Las Pinas",
    phone: "(02) 8-800-1111",
    howToClaim: ["Present Booklet & Prescription"],
  },
  "19": {
    businessName: "Watsons",
    discount: "20% SC discount",
    description: "Look good, do good, feel great with savings on varied medicines.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "10:00 AM - 9:00 PM",
    address: "SM Aura Premier, Taguig",
    phone: "(02) 7-915-0988",
    howToClaim: ["Show ID/Booklet at Pharmacy"],
  },
  "20": {
    businessName: "The Generics Pharmacy",
    discount: "20% off + 5%",
    description: "Quality affordable medicines with full senior discount.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "8:00 AM - 8:00 PM",
    address: "Taft Avenue, Manila",
    phone: "(02) 8-888-8888",
    howToClaim: ["Present Senior ID"],
  },
  "21": {
    businessName: "Rose Pharmacy",
    discount: "20% off prescriptions",
    description: "Trusted pharmacy services with senior benefits.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "8:00 AM - 9:00 PM",
    address: "Cebu City (Main)",
    phone: "(032) 230-5000",
    howToClaim: ["Standard Senior ID requirements"],
  },

  // Shopping
  "22": {
    businessName: "SM Department Store",
    discount: "20% off on senior days",
    description: "We've got it all for you, Lolo and Lola!",
    eligibilityAge: 60,
    validDays: "Contact store for schedule",
    validHours: "10:00 AM - 10:00 PM",
    address: "SM Makati, Ayala Center",
    phone: "(02) 8-811-0000",
    howToClaim: ["Visit Customer Service"],
  },
  "23": {
    businessName: "Robinsons Department Store",
    discount: "20% SC discount storewide",
    description: "A wide variety of home and fashion items with discount.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "10:00 AM - 9:00 PM",
    address: "Robinsons Place Manila",
    phone: "(02) 8-397-1888",
    howToClaim: ["Present ID at cashier"],
  },
  "24": {
    businessName: "Landmark",
    discount: "20% off for seniors",
    description: "Affordable finds for the whole family.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "10:00 AM - 8:30 PM",
    address: "Trinoma, Quezon City",
    phone: "(02) 7-901-3000",
    howToClaim: ["Show Senior ID"],
  },
  "25": {
    businessName: "Handyman",
    discount: "20% off hardware",
    description: "Home improvement tools and hardware.",
    eligibilityAge: 60,
    validDays: "Every Day",
    validHours: "10:00 AM - 9:00 PM",
    address: "Ali Mall, Cubao",
    phone: "(02) 8-911-2345",
    howToClaim: ["Present ID at counter"],
  },
};

// ... (defaultDetails remains same)

export default function DiscountDetail() {
  const { discountId } = useParams<{ discountId: string }>();
  // ... (rest of imports and hooks)
  const navigate = useNavigate();
  const { location } = useLocation();
  const { isSaved, toggleSave } = useSavedDiscounts();

  const flatDiscounts = useMemo(() => Object.values(allDiscounts).flat(), []);
  const baseDiscount = useMemo(
    () => flatDiscounts.find((d) => d.id === discountId),
    [flatDiscounts, discountId],
  );

  const details = discountId ? (mockDiscountDetails[discountId] || defaultDetails) : defaultDetails;

  const businessName = baseDiscount?.businessName ?? details.businessName;
  const discountLabel = baseDiscount?.discount ?? details.discount;

  // Find promo details using business name
  const promoInfo = useMemo(() => {
    if (!businessName) return null;
    const allPromos = Object.values(categoryPromoDetails).flat();
    return allPromos.find(p => p.businessName === businessName);
  }, [businessName]);

  const mechanicsSections = useMemo(() => {
    if (!baseDiscount?.mechanics) return null;
    const text = baseDiscount.mechanics;
    const match = text.match(
      /How to avail:\s*(.*?)\s*Eligibility:\s*(.*?)\s*Conditions:\s*(.*?)\s*Limitations:\s*(.*)/i,
    );
    if (!match) {
      // Fallback if the strict format isn't matched
      return {
        howToAvail: text,
        eligibility: "See details",
        conditions: "Standard terms apply",
        limitations: "See store for details"
      };
    }
    const [, howToAvail, eligibility, conditions, limitations] = match;
    return {
      howToAvail: howToAvail.trim(),
      eligibility: eligibility.trim(),
      conditions: conditions.trim(),
      limitations: limitations.trim(),
    };
  }, [baseDiscount]);

  // ... (Location logic remains same)
  // Simple Haversine-based ETA calculation using walking speed
  const WALKING_SPEED_KMH = 4; // average comfortable walking speed

  const { distanceKm, etaMinutes } = useMemo(() => {
    if (!location || !baseDiscount) return { distanceKm: null, etaMinutes: null };

    const R = 6371; // km
    const dLat = deg2rad(baseDiscount.lat - location.lat);
    const dLon = deg2rad(baseDiscount.lng - location.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location.lat)) * Math.cos(deg2rad(baseDiscount.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    const minutes = Math.max(1, Math.round((d / WALKING_SPEED_KMH) * 60));

    return { distanceKm: d, etaMinutes: minutes };
  }, [location, baseDiscount]);

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  const handleSave = () => {
    if (!discountId) return;
    toggleSave(discountId);
  };

  const handleGetDirections = () => {
    // In a real app, this would open maps
    window.open(`https://maps.google.com/?q=${encodeURIComponent(details.address)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-36">
      <PageHeader title="Discount Details" />

      <main className="px-4 py-6 space-y-8">
        {/* Business Header */}
        <div className="bg-card border-2 border-border rounded-2xl p-6 animate-fade-in">
          <h2 className="text-senior-2xl font-bold text-foreground mb-2">
            {businessName}
          </h2>
          <p className="text-senior-xl text-primary font-bold mb-4">
            {discountLabel}
          </p>
          <p className="text-senior-base text-muted-foreground">
            {details.description}
          </p>
        </div>

        {/* PROMO SECTION (NEW) */}
        {promoInfo && (
          <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎁</span>
              <h3 className="text-senior-lg font-bold text-foreground">
                Senior Privilege
              </h3>
            </div>
            <p className="text-senior-lg font-bold text-primary mb-2">
              {promoInfo.promo}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-senior-base text-muted-foreground">
              {promoInfo.mechanics.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )}

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

        {/* Promo Mechanics */}
        <div className="bg-card border-2 border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-primary" />
            <h3 className="text-senior-lg font-semibold text-foreground">
              Promo Mechanics
            </h3>
          </div>
          {mechanicsSections ? (
            <div className="space-y-3 text-senior-base text-muted-foreground">
              <p>
                <span className="font-semibold">How to avail:</span> {mechanicsSections.howToAvail}
              </p>
              <p>
                <span className="font-semibold">Eligibility:</span> {mechanicsSections.eligibility}
              </p>
              <p>
                <span className="font-semibold">Conditions:</span> {mechanicsSections.conditions}
              </p>
              <p>
                <span className="font-semibold">Limitations:</span> {mechanicsSections.limitations}
              </p>
            </div>
          ) : (
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
          )}
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
            {distanceKm != null && etaMinutes != null && (
              <div className="ml-9 text-senior-sm text-muted-foreground">
                ~{distanceKm.toFixed(1)} km away — ETA about{" "}
                <span className="font-semibold">{etaMinutes} min</span> on foot from your location
              </div>
            )}
            {!location && (
              <div className="ml-9 text-senior-sm text-muted-foreground">
                Turn on location on the Home or Nearby page to see an estimated travel time.
              </div>
            )}
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
            variant={discountId && isSaved(discountId) ? "default" : "outline"}
            className={`flex-1 btn-senior ${discountId && isSaved(discountId)
              ? "bg-accent hover:bg-accent/90 text-accent-foreground"
              : "border-2"
              }`}
          >
            <Heart className={`w-6 h-6 mr-2 ${discountId && isSaved(discountId) ? "fill-current" : ""}`} />
            {discountId && isSaved(discountId) ? "Saved" : "Save"}
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
