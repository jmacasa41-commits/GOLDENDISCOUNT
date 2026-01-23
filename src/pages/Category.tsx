import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { DiscountCard } from "@/components/DiscountCard";
import { BottomNav } from "@/components/BottomNav";

// Mock data for demonstration - Philippine businesses
const mockDiscounts: Record<string, Array<{
  id: string;
  businessName: string;
  discount: string;
  distance: string;
}>> = {
  restaurants: [
    { id: "1", businessName: "Jollibee", discount: "20% off for Senior Citizens", distance: "0.3 km" },
    { id: "2", businessName: "Max's Restaurant", discount: "20% off all meals for 60+", distance: "0.8 km" },
    { id: "3", businessName: "Mang Inasal", discount: "20% off for seniors", distance: "1.2 km" },
    { id: "4", businessName: "Goldilocks", discount: "20% off cakes & pastries for 60+", distance: "1.5 km" },
    { id: "5", businessName: "Chowking", discount: "20% off for Senior Citizens", distance: "0.5 km" },
  ],
  groceries: [
    { id: "6", businessName: "SM Supermarket", discount: "5% off + 20% SC discount", distance: "1.0 km" },
    { id: "7", businessName: "Puregold", discount: "20% off for seniors daily", distance: "0.6 km" },
    { id: "8", businessName: "Robinsons Supermarket", discount: "20% SC discount on groceries", distance: "1.8 km" },
    { id: "9", businessName: "Metro Supermarket", discount: "20% off for 60+ on all items", distance: "2.0 km" },
  ],
  travel: [
    { id: "10", businessName: "Philippine Airlines", discount: "20% off domestic flights for 60+", distance: "NAIA" },
    { id: "11", businessName: "Cebu Pacific", discount: "20% senior discount on base fare", distance: "NAIA" },
    { id: "12", businessName: "2GO Travel", discount: "20% off ferry tickets for seniors", distance: "Manila Port" },
    { id: "13", businessName: "Victory Liner", discount: "20% off bus fare for 60+", distance: "Cubao Terminal" },
  ],
  entertainment: [
    { id: "14", businessName: "SM Cinema", discount: "20% off movie tickets for 60+", distance: "1.0 km" },
    { id: "15", businessName: "Ayala Cinemas", discount: "20% senior discount on tickets", distance: "2.5 km" },
    { id: "16", businessName: "National Museum", discount: "Free admission for all", distance: "Manila" },
    { id: "17", businessName: "Ocean Park Manila", discount: "20% off entrance for seniors", distance: "5.0 km" },
  ],
  healthcare: [
    { id: "18", businessName: "Mercury Drug", discount: "20% off medicines for 60+", distance: "0.2 km" },
    { id: "19", businessName: "Watsons", discount: "20% SC discount on medicines", distance: "0.4 km" },
    { id: "20", businessName: "The Generics Pharmacy", discount: "20% off + additional 5% for seniors", distance: "0.5 km" },
    { id: "21", businessName: "Rose Pharmacy", discount: "20% off prescriptions for 60+", distance: "0.8 km" },
  ],
  shopping: [
    { id: "22", businessName: "SM Department Store", discount: "20% off on senior days", distance: "1.0 km" },
    { id: "23", businessName: "Robinsons Department Store", discount: "20% SC discount storewide", distance: "1.5 km" },
    { id: "24", businessName: "Landmark", discount: "20% off for seniors daily", distance: "2.0 km" },
    { id: "25", businessName: "Handyman", discount: "20% off hardware items for 60+", distance: "1.2 km" },
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
