import {
  UtensilsCrossed,
  ShoppingCart,
  Plane,
  Theater,
  Pill,
  ShoppingBag,
} from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { LocationBar } from "@/components/LocationBar";
import { BottomNav } from "@/components/BottomNav";
import { useLocation } from "@/contexts/LocationContext";
import { ManualLocationDialog } from "@/components/ManualLocationDialog";
import { useMemo, useState } from "react";
import { discounts as allDiscounts } from "@/data/discounts";
import { DiscountCard } from "@/components/DiscountCard";
import { useSavedDiscounts } from "@/contexts/SavedDiscountsContext";

const categories = [
  {
    title: "Restaurants",
    icon: UtensilsCrossed,
    to: "/category/restaurants",
    color: "hsl(0, 70%, 55%)"
  },
  {
    title: "Groceries",
    icon: ShoppingCart,
    to: "/category/groceries",
    color: "hsl(142, 50%, 45%)"
  },
  {
    title: "Travel",
    icon: Plane,
    to: "/category/travel",
    color: "hsl(210, 70%, 50%)"
  },
  {
    title: "Entertainment",
    icon: Theater,
    to: "/category/entertainment",
    color: "hsl(280, 60%, 50%)"
  },
  {
    title: "Healthcare",
    icon: Pill,
    to: "/category/healthcare",
    color: "hsl(340, 65%, 55%)"
  },
  {
    title: "Shopping",
    icon: ShoppingBag,
    to: "/category/shopping",
    color: "hsl(42, 65%, 50%)"
  },
];

export default function Home() {
  const { location, isLoading, error, requestLocation } = useLocation();
  const { isSaved, toggleSave } = useSavedDiscounts();
  const [showManualDialog, setShowManualDialog] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Curated suggested discounts (independent of current location)
  const suggestedDiscounts = useMemo(() => {
    const flatDiscounts = Object.values(allDiscounts).flat();

    // Hand-picked IDs to highlight first (can be adjusted as needed)
    const featuredIds = ["1", "6", "18", "10"];

    const featured = featuredIds
      .map((id) => flatDiscounts.find((d) => d.id === id))
      .filter((d): d is (typeof flatDiscounts)[number] => Boolean(d));

    const remaining = flatDiscounts.filter(
      (d) => !featuredIds.includes(d.id)
    );

    return [...featured, ...remaining].slice(0, 5);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-8 rounded-b-3xl shadow-md">
        <h1 className="text-senior-2xl font-bold mb-2">
          {getGreeting()}! 👋
        </h1>
        <p className="text-senior-base text-primary-foreground/90">
          Find discounts made for you
        </p>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Location Bar */}
        <LocationBar
          location={location?.address || (isLoading ? "Detecting your location..." : "Select Location")}
          onChangeLocation={() => setShowManualDialog(true)}
        />

        {/* Location error / permission handling */}
        {error && (
          <div className="mt-2 bg-destructive/10 border border-destructive/30 text-destructive text-senior-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Suggested Discounts (curated, not location-based) */}
        <section className="space-y-4">
          <div className="px-2">
            <h2 className="text-senior-xl font-bold text-foreground">
              Suggested Discounts
            </h2>
            <p className="text-senior-sm text-muted-foreground mt-1">
              A few ideas to get you started today.
            </p>
          </div>

          <div className="space-y-3">
            {suggestedDiscounts.map((discount) => (
              <DiscountCard
                key={discount.id}
                id={discount.id}
                businessName={discount.businessName}
                discount={discount.discount}
                distance={discount.distance || ""}
                isSaved={isSaved(discount.id)}
                onSaveToggle={() => toggleSave(discount.id)}
              />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-senior-xl font-bold text-foreground mb-4 px-2">
            Browse Discounts
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
                to={category.to}
                color={category.color}
              />
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-5">
          <h3 className="text-senior-lg font-semibold text-foreground mb-2">
            💡 Quick Tip
          </h3>
          <p className="text-senior-base text-muted-foreground">
            Tap the heart icon on any discount to save it for later.
          </p>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
      {/* Manual Location Dialog for Home page updates */}
      <ManualLocationDialog
        open={showManualDialog}
        onOpenChange={setShowManualDialog}
      />
    </div>
  );
}
