import { Heart, WifiOff } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DiscountCard } from "@/components/DiscountCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSavedDiscounts } from "@/contexts/SavedDiscountsContext";
import { discounts as allDiscounts } from "@/data/discounts";

export default function SavedDiscounts() {
  const { savedIds, toggleSave } = useSavedDiscounts();

  // Flatten discounts and filter by saved IDs
  const savedDiscountsList = Object.values(allDiscounts)
    .flat()
    .filter((discount) => savedIds.has(discount.id));

  // In a real app, you might check navigator.onLine or use a hook
  const isOffline = false;

  return (
    <div className="min-h-screen bg-background pb-28">
      <PageHeader title="Saved Discounts" showBack={false} />

      {/* Offline indicator */}
      {isOffline && (
        <div className="mx-4 mt-4 bg-muted rounded-xl p-4 flex items-center gap-3">
          <WifiOff className="w-6 h-6 text-muted-foreground" />
          <span className="text-senior-base text-muted-foreground">
            You're offline. Showing saved discounts.
          </span>
        </div>
      )}

      <main className="px-4 py-6">
        {savedDiscountsList.length > 0 ? (
          <div className="space-y-4">
            {savedDiscountsList.map((discount) => (
              <DiscountCard
                key={discount.id}
                id={discount.id}
                businessName={discount.businessName}
                discount={discount.discount}
                distance={discount.distance || ""} // Fallback if undefined in your type, though likely string
                isSaved={true}
                onSaveToggle={() => toggleSave(discount.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 animate-fade-in">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-senior-xl font-semibold text-foreground mb-3">
              No Saved Discounts Yet
            </h2>
            <p className="text-senior-base text-muted-foreground mb-8">
              Tap the heart icon on any discount to save it here for quick access.
            </p>
            <Link to="/home">
              <Button className="btn-senior bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse Discounts
              </Button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
