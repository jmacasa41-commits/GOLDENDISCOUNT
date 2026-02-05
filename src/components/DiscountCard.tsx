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
    <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-md active:scale-[0.98] transition-transform duration-100">
      <div className="flex flex-col gap-5">
        {/* Header: Business Name and Save Button */}
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <h3 className="text-senior-lg md:text-senior-xl font-bold text-foreground leading-tight flex-1 break-words line-clamp-2">
            {businessName}
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              onSaveToggle?.();
            }}
            className="touch-target flex items-center justify-center rounded-xl hover:bg-muted/50 transition-colors flex-shrink-0 -mt-2 -mr-2"
            aria-label={isSaved ? "Remove from saved" : "Save discount"}
          >
            <Heart
              className={`w-8 h-8 md:w-9 md:h-9 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
              strokeWidth={2}
            />
          </button>
        </div>

        <Link to={`/discount/${id}`} className="block space-y-5">
          {/* Discount Display - Clean Dark Design */}
          <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border-l-4 border-primary relative overflow-hidden">
            <p className="text-senior-xl md:text-senior-2xl text-white font-black leading-tight drop-shadow-sm relative z-10 break-words">
              {discount}
            </p>
          </div>

          {/* Details Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <MapPin className="w-7 h-7 text-slate-600" strokeWidth={2.5} />
              </div>
              <span className="text-senior-base font-bold">{distance}</span>
            </div>

            <div className="bg-primary text-primary-foreground px-5 py-3 rounded-xl font-bold text-base shadow-md hover:bg-primary/90 transition-colors">
              View Details
            </div>
          </div>

          {/* Optional Promo Summary */}
          {mechanicsSummary && (
            <p className="pt-3 text-senior-base text-muted-foreground border-t-2 border-border/50">
              {mechanicsSummary}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
}
