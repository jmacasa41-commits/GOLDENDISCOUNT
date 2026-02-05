import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DiscountCard } from "@/components/DiscountCard";
import { BottomNav } from "@/components/BottomNav";
import { discounts as mockDiscounts, categoryThemes } from "@/data/discounts";
import { useSavedDiscounts } from "@/contexts/SavedDiscountsContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isSaved, toggleSave } = useSavedDiscounts();

  // Use the ID from the URL as the default expanded item, or 'restaurants' if none
  const defaultTab = categoryId || "restaurants";

  // State to control appropriate accordion item
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync activeTab with URL parameter changes
  useEffect(() => {
    if (categoryId) {
      setActiveTab(categoryId);
    }
  }, [categoryId]);

  const handleAccordionChange = (value: string) => {
    // Update active tab to trigger re-render and re-sort
    if (value) {
      setActiveTab(value);
    }
  };

  // Sort categories: Active tab first, then others
  const sortedCategories = Object.entries(categoryThemes).sort(([keyA], [keyB]) => {
    if (keyA === activeTab) return -1;
    if (keyB === activeTab) return 1;
    return 0; // Keep original order for others
  });

  return (
    <div className="min-h-screen bg-background pb-28">
      <PageHeader title="All Categories" />

      <main className="px-4 py-6">
        <Accordion
          type="single"
          collapsible
          value={activeTab}
          className="space-y-4"
          onValueChange={handleAccordionChange}
        >
          {sortedCategories.map(([key, theme]) => {
            if (!theme) return null;
            const discounts = mockDiscounts[key] || [];

            return (
              <AccordionItem
                key={key}
                value={key}
                id={`category-${key}`}
                className="bg-card border-2 border-border rounded-xl px-4 shadow-sm transition-all duration-500 ease-in-out"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.color }}
                    >
                      <theme.icon className="w-5 h-5" />
                    </div>
                    <span className="text-senior-lg font-bold text-foreground">
                      {theme.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-5 space-y-6">
                  {discounts.length > 0 ? (
                    discounts.map((discount) => (
                      <div key={discount.id} className="space-y-4">
                        <DiscountCard
                          id={discount.id}
                          businessName={discount.businessName}
                          discount={discount.discount}
                          distance={discount.distance || ""}
                          isSaved={isSaved(discount.id)}
                          onSaveToggle={() => toggleSave(discount.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-senior-base text-muted-foreground text-center py-4">
                      No discounts found in this category.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>

      <BottomNav />
    </div>
  );
}
