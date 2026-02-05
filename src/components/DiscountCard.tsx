import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface DiscountCardProps {
  id: string;
  businessName: string;
  discount: string;
  distance: string;
  isSaved?: boolean;
  onSaveToggle?: () => void;
  mechanicsSummary?: string;
}

export function DiscountCard({
  id,
  businessName,
  discount,
  distance,
  isSaved = false,
  onSaveToggle,
  mechanicsSummary,
}: DiscountCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-sm active:scale-[0.98] transition-transform duration-100">
      <div className="flex flex-col gap-3">
        {/* Header: Business Name and Save Button */}
        <div className="flex items-start justify-between">
          <h3 className="text-senior-xl font-bold text-foreground leading-tight">
            {businessName}
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSaveToggle?.();
            }}
            className="touch-target flex items-center justify-center -mt-2 -mr-2"
            aria-label={isSaved ? "Remove from saved" : "Save discount"}
          >
            <Heart
              className={`w-8 h-8 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
            />
          </button>
        </div>

        <Link to={`/discount/${id}`} className="block space-y-3">
          {/* Main Discount - High Contrast */}
          <div className="bg-primary/5 rounded-md p-3 border-l-4 border-primary">
            <p className="text-senior-2xl text-primary font-bold leading-none">
              {discount}
            </p>
          </div>

          {/* Details Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-6 h-6" />
              <span className="text-senior-base font-medium">{distance}</span>
            </div>

            <div className="bg-secondary text-primary-foreground px-4 py-2 rounded-md font-bold text-sm">
              View Details
            </div>
          </div>

          {/* Optional Promo Summary */}
          {mechanicsSummary && (
            <p className="pt-2 text-senior-base text-muted-foreground border-t border-border/50">
              {mechanicsSummary}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}
