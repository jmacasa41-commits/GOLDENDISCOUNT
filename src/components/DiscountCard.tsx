import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface DiscountCardProps {
  id: string;
  businessName: string;
  discount: string;
  distance: string;
  isSaved?: boolean;
  onSaveToggle?: () => void;
}

export function DiscountCard({
  id,
  businessName,
  discount,
  distance,
  isSaved = false,
  onSaveToggle,
}: DiscountCardProps) {
  return (
    <div className="bg-card border-2 border-border rounded-2xl p-5 shadow-sm animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <Link to={`/discount/${id}`} className="flex-1">
          <h3 className="text-senior-xl font-bold text-foreground mb-2">
            {businessName}
          </h3>
          <p className="text-senior-lg text-primary font-semibold mb-3">
            {discount}
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span className="text-senior-base">{distance}</span>
          </div>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            onSaveToggle?.();
          }}
          className="touch-target flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          aria-label={isSaved ? "Remove from saved" : "Save discount"}
        >
          <Heart
            className={`w-8 h-8 transition-colors ${
              isSaved ? "fill-accent text-accent" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
