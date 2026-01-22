import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { DiscountCard } from "@/components/DiscountCard";
import { BottomNav } from "@/components/BottomNav";

// Mock data for demonstration
const mockDiscounts: Record<string, Array<{
  id: string;
  businessName: string;
  discount: string;
  distance: string;
}>> = {
  restaurants: [
    { id: "1", businessName: "Golden Corral", discount: "15% off for 60+", distance: "0.5 miles" },
    { id: "2", businessName: "Denny's", discount: "20% off breakfast for 55+", distance: "1.2 miles" },
    { id: "3", businessName: "IHOP", discount: "10% off all meals for 55+", distance: "1.8 miles" },
    { id: "4", businessName: "Applebee's", discount: "15% off for seniors", distance: "2.1 miles" },
  ],
  groceries: [
    { id: "5", businessName: "Safeway", discount: "10% off on Tuesdays for 55+", distance: "0.3 miles" },
    { id: "6", businessName: "Kroger", discount: "5% off all purchases for 60+", distance: "0.8 miles" },
    { id: "7", businessName: "Whole Foods", discount: "10% off for Prime members 60+", distance: "1.5 miles" },
  ],
  travel: [
    { id: "8", businessName: "Amtrak", discount: "10% off for 62+", distance: "3.0 miles" },
    { id: "9", businessName: "Southwest Airlines", discount: "Special senior fares for 65+", distance: "15 miles" },
    { id: "10", businessName: "Enterprise", discount: "5% off car rentals for 50+", distance: "2.5 miles" },
  ],
  entertainment: [
    { id: "11", businessName: "AMC Theatres", discount: "30% off on Senior Days for 60+", distance: "1.0 miles" },
    { id: "12", businessName: "Regal Cinemas", discount: "25% off tickets for 60+", distance: "2.2 miles" },
    { id: "13", businessName: "Local Museum", discount: "Free admission for 65+", distance: "0.7 miles" },
  ],
  healthcare: [
    { id: "14", businessName: "CVS Pharmacy", discount: "20% off on Senior Days for 60+", distance: "0.4 miles" },
    { id: "15", businessName: "Walgreens", discount: "15% off for Seniors on Tuesdays", distance: "0.6 miles" },
    { id: "16", businessName: "GoodRx", discount: "Extra 5% off for 55+", distance: "Online" },
  ],
  shopping: [
    { id: "17", businessName: "Kohl's", discount: "15% off on Wednesdays for 60+", distance: "2.0 miles" },
    { id: "18", businessName: "Ross", discount: "10% off on Tuesdays for 55+", distance: "1.3 miles" },
    { id: "19", businessName: "Goodwill", discount: "25% off for seniors on Tuesdays", distance: "0.9 miles" },
  ],
};

const categoryTitles: Record<string, string> = {
  restaurants: "Restaurants",
  groceries: "Groceries",
  travel: "Travel",
  entertainment: "Entertainment",
  healthcare: "Healthcare",
  shopping: "Shopping",
};

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const discounts = categoryId ? mockDiscounts[categoryId] || [] : [];
  const title = categoryId ? categoryTitles[categoryId] || "Discounts" : "Discounts";

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <PageHeader title={title} />

      <main className="px-4 py-6">
        {discounts.length > 0 ? (
          <div className="space-y-4">
            {discounts.map((discount) => (
              <DiscountCard
                key={discount.id}
                id={discount.id}
                businessName={discount.businessName}
                discount={discount.discount}
                distance={discount.distance}
                isSaved={savedIds.has(discount.id)}
                onSaveToggle={() => toggleSave(discount.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-senior-xl font-semibold text-foreground mb-3">
              No Discounts Found
            </h2>
            <p className="text-senior-base text-muted-foreground">
              We couldn't find discounts in this category near you. Try a different location or category.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
