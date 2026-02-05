import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { DiscountCard } from "@/components/DiscountCard";
import { BottomNav } from "@/components/BottomNav";
import { useLocation } from "@/contexts/LocationContext";
import { discounts as allDiscounts } from "@/data/discounts";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import { useSavedDiscounts } from "@/contexts/SavedDiscountsContext";

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

export default function Nearby() {
    const { location } = useLocation();
    const navigate = useNavigate();
    const { isSaved, toggleSave } = useSavedDiscounts();

    // Logic: 
    // 1. Calculate distance for ALL items.
    // 2. Try radius 3km. If results > 0, stop.
    // 3. Else try 5km. If results > 0, stop.
    // 4. Else try 10km.
    // 5. Group results by category.

    const { groupedDiscounts, currentRadius, hasResults } = useMemo(() => {
        if (!location) return { groupedDiscounts: {}, currentRadius: 0, hasResults: false };

        const flatDiscounts = Object.values(allDiscounts).flat();

        // Calculate all distances first
        const withDistance = flatDiscounts.map((discount) => {
            const dist = calculateDistance(
                location.lat,
                location.lng,
                discount.lat,
                discount.lng
            );
            return { ...discount, distanceValue: dist, distance: `${dist.toFixed(1)} km` };
        });

        // Auto-expand radius
        const radii = [3, 5, 10];
        let selectedRadius = 10;
        let filtered = [];

        for (const radius of radii) {
            const inRange = withDistance.filter(d => d.distanceValue <= radius);
            if (inRange.length > 0) {
                selectedRadius = radius;
                filtered = inRange;
                break;
            }
        }

        // Sort by distance
        filtered.sort((a, b) => a.distanceValue - b.distanceValue);

        // Group by category
        const grouped: Record<string, typeof filtered> = {};
        filtered.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item);
        });

        return {
            groupedDiscounts: grouped,
            currentRadius: selectedRadius,
            hasResults: filtered.length > 0
        };
    }, [location]);

    // Order of categories for display
    const categoryOrder = ["restaurants", "groceries", "healthcare", "travel", "entertainment", "shopping"];

    return (
        <div className="min-h-screen bg-background pb-28">
            <PageHeader title="Nearby Discounts" />

            <main className="px-4 py-6">
                {!location ? (
                    <div className="text-center py-16 px-6">
                        <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8 text-secondary-foreground" />
                        </div>
                        <h2 className="text-senior-xl font-semibold text-foreground mb-3">
                            Location Required
                        </h2>
                        <p className="text-senior-base text-muted-foreground mb-6">
                            Please enable location to see discounts near you.
                        </p>
                        <Button
                            onClick={() => navigate("/")}
                            className="w-full btn-senior bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Enable Location
                        </Button>
                    </div>
                ) : hasResults ? (
                    <>
                        <div className="mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div className="text-sm text-foreground">
                                Found discounts within <strong>{currentRadius}km</strong> of {location.address || "you"}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {categoryOrder.map(categoryKey => {
                                const items = groupedDiscounts[categoryKey];
                                if (!items || items.length === 0) return null;

                                const categoryTitle = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

                                return (
                                    <div key={categoryKey} className="space-y-4">
                                        <h3 className="text-senior-lg font-semibold text-foreground flex items-center gap-2">
                                            {categoryTitle}
                                            <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                                {items.length}
                                            </span>
                                        </h3>
                                        {items.map((discount) => (
                                            <DiscountCard
                                                key={discount.id}
                                                id={discount.id}
                                                businessName={discount.businessName}
                                                discount={discount.discount}
                                                distance={discount.distance}
                                                isSaved={isSaved(discount.id)}
                                                onSaveToggle={() => toggleSave(discount.id)}
                                            />
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 px-6">
                        <div className="text-6xl mb-6">🔍</div>
                        <h2 className="text-senior-xl font-semibold text-foreground mb-3">
                            No Nearby Discounts
                        </h2>
                        <p className="text-senior-base text-muted-foreground">
                            We couldn't find any discounts even within 10km of your location.
                            <br /><br />
                            Try entering a different location manually (e.g. "Manila").
                        </p>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
